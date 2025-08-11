import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy,Component,EventEmitter,Output,input} from '@angular/core';

@Component({
  selector: 'app-child-input-signal',
  imports: [CommonModule],
  standalone: true,
  template: `
    <p>AC1) Get all country names and display on the page: </p>
    <button (click)="toParent.emit()">Fetch AC1</button>
 
    @if (selectedCountry$(); as selectedCountry) {
      <div>
        <h2>{{ selectedCountry.name?.common }}</h2>
        <img [src]="selectedCountry.flags?.png"  />
      </div>
    }
    
    <!-- Displays  -->
    <p>AC2) Select a country and Show the flag: </p>
    <ul>
      @for (item of items$(); track item?.name?.common) {
        <li (click)="onCountrySelected(item?.name?.common)">
          <p>country name: {{ item?.name?.common }}</p>
        </li>
      } 
    </ul>
 
    <p>AC3) Search countries by language: </p>
    <!-- Search by language -->
    <input 
      type="text" 
      placeholder="Search by language (spanish)" 
      (input)="onLanguageSearch($any($event.target).value)"
    />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildInputSignalComponent {
  @Output() toParent = new EventEmitter();
  @Output() countrySelected = new EventEmitter<string>();
  @Output() languageSearch = new EventEmitter<Event>();

  // Use `input` function to define inputs
  items$ = input<any[]>([]); // Signal input with default value
  selectedCountry$ = input<any | null>(null); // Signal input with default value

  onCountrySelected(countryName: string): void {
    this.countrySelected.emit(countryName);
  }

  onLanguageSearch(event: Event): void {
    this.languageSearch.emit(event);
  }
}