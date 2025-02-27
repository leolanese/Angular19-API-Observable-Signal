import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { APISignalService } from './api-signal.service';

@Component({
  selector: 'app-orphan-signal-payload-nested',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>AC1) Get all country names and display on the page:</p>
    <button (click)="fetchData('independent?fields=name')">Fetch AC1</button>
    <div *ngIf="data(); let selectedCountry">
      <h2>{{ selectedCountry.name.common }}</h2>
      <img [src]="selectedCountry.flags.png" alt="{{ selectedCountry.name.common }} flag" />
    </div>
    
    <p>AC2) Select a country and Show the flag:</p>
    <ul>
      @for (item of apiSignalService.items(); track item.name.common) {
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
  `,
})
export class OrphanSignalPayloadNestedComponent {
  apiSignalService = inject(APISignalService);

  // Expose the Signal from the service
  data = this.apiSignalService.data;

  fetchData(term: string): void {
    this.apiSignalService.fetchData(term);
  }

  selectCountry(countryName: string): void {
    this.apiSignalService.selectCountry(countryName);
  }
}