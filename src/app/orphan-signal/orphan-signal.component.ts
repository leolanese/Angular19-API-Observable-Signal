import {CommonModule} from '@angular/common';
import {Component,DestroyRef,inject,signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {distinctUntilChanged,map} from 'rxjs';
import {APIService} from '../api.service';

@Component({
  selector: 'app-orphan-signal',
  imports: [CommonModule],
  template: `
    <p>AC1) Get all country names and display on the page:</p>
    <button (click)="fetchData('independent?fields=name')">Fetch AC1</button>

    <p>AC2) Select a country and Show the flag:</p>
    <ul>
      @for (item of items(); track item.name.common) {
        <li (click)="onCountrySelected(item.name.common)">
          <p>Country name: {{ item.name.common }}</p>
        </li>
      } @empty {
        <li>Loading...</li>
      }
    </ul>

    <div *ngIf="selectedCountry() as selectedCountry">
      <h2>{{ selectedCountry.name.common }}</h2>
      <img [src]="selectedCountry.flags.png" alt="{{ selectedCountry.name.common }} flag" />
    </div>

    <p>AC3) Search countries by language:</p>
    <input
      type="text"
      placeholder="Search by language (spanish)"
      (input)="fetchData('lang/' + $any($event.target).value + '?fields=name')" />    
  `
})
export class OrphanSignalComponent {
  items = signal<any[]>([]);
  selectedCountry = signal<any | null>(null);

  private apiService = inject(APIService);
  private destroyRef = inject(DestroyRef);

  fetchData<T = any>(term: string): void {
    const url = `${this.apiService.apiUrl}${term}`;

    this.apiService.get<T[]>(url).pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(data => {
      this.items.set(data);
    });
  }

  onCountrySelected(countryName: string): void {
    this.fetchData<any>(`name/${countryName}?fields=name,flags`);

    this.apiService.get<any[]>(`${this.apiService.apiUrl}name/${countryName}?fields=name,flags`).pipe(
      map(data => data[0]),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(data => {
      this.selectedCountry.set(data);
    });
  }
}
