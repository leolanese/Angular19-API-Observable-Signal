import {Component,DestroyRef,inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BehaviorSubject,distinctUntilChanged,of,switchMap} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {APIService} from '../api.service';
import {ChildComponent} from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  template: `
    <app-child 
      (toParent)="fetchData('independent?fields=name')"  
      (countrySelected)="selectedCountry($event)"
      (languageSearch)="fetchData('lang/' + $event + '?fields=name')"
      
      [items$]="data$"
      [selectedCountry$]="selectedCountry$"
    />
  `,
  styles: [],
  standalone: true,
})
export class ParentComponent {
  data$!: Observable<any[]>;  // Observable to hold the list of countries
  private selectedCountrySubject = new BehaviorSubject<any | null>(null); // Holds the selected country details
  selectedCountry$ = this.selectedCountrySubject.asObservable();
  
  apiService = inject(APIService);
  destroyRef = inject(DestroyRef);

  // smart component fully reusable with generic type
  // <T> is a generic placeholder
  // here the 'lance shape generic': <T>(term:string) will be replace by <user>
  fetchData<T = any>(term: any): void { //  T = any generic with default fallback
    const url = `${this.apiService.apiUrl}${term}`;
    this.data$ = this.apiService
      .get<T[]>(url).pipe(
        distinctUntilChanged(), // emit ONLY, if data has changed from previous emission
        takeUntilDestroyed(this.destroyRef) // Clean up subscriptions
      );
  }

  // Fetch details of a selected country (name and flag)
  selectedCountry(countryName: string): void {
    this.data$ = this.apiService.get<any[]>(`${this.apiService.apiUrl}name/${countryName}?fields=name,flags`).pipe(
      // switchMap to handle API calls properly and update selectedCountrySubject only when new data arrives
      switchMap(data => {
        const country = data?.[0] || null;  // Ensure we get a valid object
        this.selectedCountrySubject.next(country);
        return of(data);
      }),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    );
  }

}
