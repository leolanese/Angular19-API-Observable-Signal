import { Component, inject } from '@angular/core';
import { APISignalService } from './api-signal.service';

@Component({
  selector: 'app-orphan-signal-input-pattern-nested',
  standalone: true,
  template: `
    <p>AC1) Get all country names and display on the page:</p>
    <button (click)="apiSignalService.initialSearchTerm.set('independent?fields=name')">
      Fetch AC1
    </button>

    @if (apiSignalService.isLoading()) {
      <div>Loading...</div>
    } @else if (apiSignalService.error()) {
      <div style="color: red">{{ apiSignalService.error() }}</div>
    } @else if (apiSignalService.selectedCountry()) {
      <div>
        <h2>{{ apiSignalService.selectedCountry()?.name?.common }}</h2>
        <img [src]="apiSignalService.selectedCountry()?.flags?.png" />
      </div>
    }

    <p>AC2) Select a country and Show the flag:</p>
    <ul>
      @for (item of apiSignalService.items(); track item) {
        <li (click)="apiSignalService.selectCountry(item.name.common)">
          <p>Country name: {{ item.name.common }}</p>
        </li>
      }
    </ul>

    <p>AC3) Search countries by language:</p>
    <input
      type="text"
      placeholder="Search by language (spanish)"
      [value]="apiSignalService.languageSearchTerm()"
      (input)="onLanguageSearch($event)"
    />

  `
})
export class OrphanSignalInputPatternNestedComponent {
  apiSignalService = inject(APISignalService);

  onLanguageSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.apiSignalService.languageSearchTerm.set(value);
  }
}
