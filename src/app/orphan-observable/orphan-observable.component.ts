import {AsyncPipe,CommonModule} from '@angular/common';
import {Component,DestroyRef,inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BehaviorSubject,distinctUntilChanged,map} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {APIService} from '../api.service';

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
        <li (click)="onCountrySelected(item.name.common)">
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
      (input)="onLanguageSearch($event)"
    />
  `,
})
export class OrphanObservableComponent {
  // just use Subjects/next() not plain variables
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
  onCountrySelected(countryName: string): void {
    this.fetchData<any>('name/' + countryName + '?fields=name,flags');

    this.items$.pipe(
      map(data => data[0]) // Extract the first result
    ).subscribe(data => {
      this.selectedCountrySubject.next(data);
    });
  }

  onLanguageSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value.trim()) {
      this.fetchData<any>('lang/' + inputElement.value + '?fields=name');
    }
  }
}
