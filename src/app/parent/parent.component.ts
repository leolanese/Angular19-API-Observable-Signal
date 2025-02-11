import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { APIService } from '../api.service';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  template: `
    <app-child 
      (toParent)="fetchData('all?fields=name')"  
      (countrySelected)="onCountrySelected($event)"
      (languageSearch)="onLanguageSearch($event)"
      
      [items$]="data$"
      [selectedCountry]="selectedCountry"
    />
  `,
  styles: ``,
  standalone: true,
})
export class ParentComponent {
  data$!: Observable<any[]>  // Observable to hold the list of countries
  selectedCountry: any; // Holds the selected country details

  apiService = inject(APIService)
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

  // Fetch all countries (default behavior)
  fetchAllCountries(): void {
    this.fetchData<any>('all?fields=name');
  }

  // Fetch details of a selected country (name and flag)
  onCountrySelected(countryName: string): void {
    this.fetchData<any>(`name/${countryName}?fields=name,flags`);

    this.data$.pipe(
      map(data => data[0]) // Extract the first result
    ).subscribe(data => {
      this.selectedCountry = data;
    });
  }

  // Search countries by language
  onLanguageSearch(language: string): void {
    this.fetchData<any>(`lang/${language}?fields=name`);
  }

}
