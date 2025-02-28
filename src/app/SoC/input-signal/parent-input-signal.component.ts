import {Component,DestroyRef,inject,signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BehaviorSubject,distinctUntilChanged,of,switchMap} from 'rxjs';
import {APIService} from '../api.service';
import {ChildInputSignalComponent} from './child-input-signal.component';

@Component({
  selector: 'app-parent',
  imports: [ChildInputSignalComponent],
  template: `
    <app-child-input-signal
      (toParent)="fetchData('independent?fields=name')"  
      (countrySelected)="selectedCountry($event)"
      (languageSearch)="fetchData('lang/' + $event + '?fields=name')"
      
      [items$]="dataSignal()"
      [selectedCountry$]="selectedCountrySignal()"
    />
  `,
  styles: [],
  standalone: true,
})
export class ParentInputSignalComponent {
  apiService = inject(APIService);
  destroyRef = inject(DestroyRef);

  // Signals to hold the list of countries and selected country
  dataSignal = signal<any[]>([]); // Signal for country list
  selectedCountrySignal = signal<any | null>(null); // Signal for selected country

  // BehaviorSubject to hold the selected country details (for internal use)
  private selectedCountrySubject = new BehaviorSubject<any | null>(null);

  fetchData<T = any>(term: any): void {
    const url = `${this.apiService.apiUrl}${term}`;
    this.apiService
      .get<T[]>(url)
      .pipe(
        distinctUntilChanged(), // Emit only if data has changed
        takeUntilDestroyed(this.destroyRef) // Clean up subscriptions
      )
      .subscribe(data => {
        this.dataSignal.set(data); // Update the signal with new data
      });
  }

  // Fetch details of a selected country (name and flag)
  selectedCountry(countryName: string): void {
    this.apiService
      .get<any[]>(`${this.apiService.apiUrl}name/${countryName}?fields=name,flags`)
      .pipe(
        switchMap(data => {
          const country = data?.[0] || null; // Ensure we get a valid object
          this.selectedCountrySignal.set(country); // Update the signal with selected country
          return of(data);
        }),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}