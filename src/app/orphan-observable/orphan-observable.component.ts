import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { APIService } from '../SoC/api.service';

@Component({
  selector: 'app-orphan-observable',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <p>AC1) Get all country names and display on the page: </p>
    <button (click)="fetchData('independent?fields=name')">Fetch AC1</button>
 
    <!-- Displays  -->
    <p>AC2) Select a country and Show the flag: </p>
    <ul>
      @for (item of items$ | async; track item.name.common) {
        <!-- <pre>{{ items$ | async | json }}</pre> -->
        <li (click)="selectedCountry(item.name.common)">
          <p>country name: {{ item.name.common }}</p>
        </li>
      } @empty {
          <li>Loading...</li>
      }
    </ul>
    <!-- Display selected country flag -->
    <div *ngIf="selectedCountry$ | async as selectedCountry">
      <h2>{{ selectedCountry.name.common }}</h2>
      <img [src]="selectedCountry.flags.png" />
    </div>
    
    <p>AC3) Search countries by language: </p>
    <!-- Search by language -->
    <input 
      type="text" 
      placeholder="Search by language (spanish)" 
      (input)="fetchData('lang/' + $any($event.target).value + '?fields=name')" />
  `,
})
export class OrphanObservableComponent {
  // just use Subjects/next() NOT plain variables
  items$!: Observable<any[]>
  private selectedCountrySubject = new BehaviorSubject<any | null>(null); // Holds the selected country details
  selectedCountry$ = this.selectedCountrySubject.asObservable();

  private apiService = inject(APIService);
  private destroyRef = inject(DestroyRef);

  fetchData<T = any>(term: any): void { //  T = any generic with default fallback
    const url = this.apiService.apiUrl + term;

    this.items$ = this.apiService
      .get<T[]>(url).pipe(
        distinctUntilChanged(), // emit ONLY, if data has changed from previous emission
        takeUntilDestroyed(this.destroyRef) // Clean up subscriptions
      );
  }

  // Fetch details of a selected country (name and flag)
  selectedCountry(countryName: string): void {
    const url = `${this.apiService.apiUrl}name/${countryName}?fields=name,flags`;

    this.items$ = this.apiService.get<any[]>(url).pipe(
      // switchMap Works Well for Clicks
      // `switchMap` to handle API calls properly and update selectedCountrySubject only when new data arrives
      // switchMap does:
      // It switches to a new request.
      // It cancels the previous one.
      // WIN? Ensures the latest click always wins. Keep UI/UX  responsive and accurate.
      switchMap(data => {
        const country = data?.[0] || null; // Ensure we get a valid object
        this.selectedCountrySubject.next(country);
        return of(data);
      }),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    );
  }

}
