import {AsyncPipe,CommonModule} from '@angular/common';
import {ChangeDetectionStrategy,Component,EventEmitter,Input,Output} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-child',
  imports: [CommonModule, AsyncPipe],
  standalone: true,
  template: `
    <p>AC1) Get all country names and display on the page: </p>
    <button (click)="toParent.emit()">Fetch AC1</button>
 
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
    <div *ngIf="selectedCountry">
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
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Output() toParent = new EventEmitter();
  @Output() countrySelected= new EventEmitter<string>();
  @Output() languageSearch = new EventEmitter<string>();

  @Input() items$!: Observable<any[]>; 
  // TS non-null assertion operator
  // avoids unnecessary null/undefined checks when working with @Input()
  @Input()  selectedCountry: any; // Input for selected country details

  onCountrySelected(countryName: string): void {
    this.countrySelected.emit(countryName);
  }

  onLanguageSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value.trim()) {
      this.languageSearch.emit(inputElement.value);
    }
  }
}
