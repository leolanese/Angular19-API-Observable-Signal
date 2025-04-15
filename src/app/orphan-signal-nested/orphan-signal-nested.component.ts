import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { APISignalService } from './api-signal.service';

@Component({
  selector: 'app-orphan-signal-nested',
  standalone: true,
  providers: [APISignalService],
  imports: [CommonModule],
  template: `
    <p>AC1) Get all country names and display on the page:</p>
    <button (click)="apiSignalService.fetchData('independent?fields=name')">
      Fetch AC1
    </button>

    @if (apiSignalService.data(); as selectedCountry) {
      <div>
        <h2>{{ selectedCountry.name?.common }}</h2>
        <img [src]="selectedCountry.flags?.png" />
      </div>
    }

    <p>AC2) Select a country and Show the flag:</p>
    <ul>
      @for (item of apiSignalService.items(); track item.name.common) {
        <li (click)="apiSignalService.selectCountry(item.name.common)">
          <p>Country name: {{ item.name.common }}</p>
        </li>
      }
    </ul>

    <p>AC3) Search countries by language:</p>
    <input
      type="text"
      placeholder="Search by language (spanish)"
      (input)="
        apiSignalService.fetchData(
          'lang/' + $any($event.target).value + '?fields=name'
        )
      "
    />
  `,
})
export class OrphanSignalNestedComponent {
  apiSignalService = inject(APISignalService);
}
