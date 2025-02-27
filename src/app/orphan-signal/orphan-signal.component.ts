import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map } from 'rxjs';
import { APISignalService } from './api-signal.service';

@Component({
  selector: 'app-orphan-signal',
  imports: [CommonModule],
  template: `
    <p>AC1) Get all country names and display on the page:</p>
    <button (click)="fetchData('independent?fields=name')">Fetch AC1</button>

    <div *ngIf="selectedCountry() as selectedCountry">
      <h2>{{ selectedCountry.name.common }}</h2>
      <img [src]="selectedCountry.flags.png" alt="{{ selectedCountry.name.common }} flag" />
    </div>

    <p>AC2) Select a country and Show the flag:</p>
    <ul>
      @for (item of items(); track item.name.common) {
        <li (click)="selectCountry(item.name.common)">
          <p>Country name: {{ item.name.common }}</p>
        </li>
      } @empty {
        <li>Loading...</li>
      }
    </ul>

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

  private apiSignalService = inject(APISignalService);
  private destroyRef = inject(DestroyRef);

  fetchData<T = any>(term: string): void {
    const url = `${this.apiSignalService.apiUrl}${term}`;

    this.apiSignalService.get<T[]>(url).pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(data => {
      // Update the Signal with the new data
      this.items.set(data);
    });
  }

  // No, I Don't Need switchMap:
  // Signals hold state (not stream of Observable).
  // selectedCountry.set(data) overwrites the previous value immediately.
  // No need for cancellation because a new API request doesn’t leave previous requests hanging.
  // Each click directly updates the Signal without any need for operators like switchMap.
  selectCountry(countryName: string): void {
    const url = `${this.apiSignalService.apiUrl}name/${countryName}?fields=name,flags`;

    this.apiSignalService.get<any[]>(url).pipe(
      map(data => data[0]),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(data => {
      // Update the Signal with the selected country
      this.selectedCountry.set(data);
    });
  }
}
