import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  imports: [CommonModule, AsyncPipe],
  standalone: true,
  template: `
    <!-- List of countries -->
    <button (click)="toParent.emit()">Fetch AC1</button>
    <ul>
      @for (item of items$ | async; let index = $index; track index) {
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

    <!-- Search by language -->
    <input 
      type="text" 
      placeholder="Search by language (e.g., spanish)" 
      (input)="onLanguageSearch($event)"
    />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Output()  // -> P
  toParent = new EventEmitter();
  @Output() 
  countrySelected= new EventEmitter<string>();
  @Output() 
  languageSearch = new EventEmitter<string>();

  @Input() // C <-
  items$!: Observable<any[]>; 
  // TS non-null assertion operator
  // avoids unnecessary null/undefined checks when working with @Input()
  @Input() 
  selectedCountry: any; // Input for selected country details

  onCountrySelected(countryName: string): void {
    this.countrySelected.emit(countryName);
  }

  onLanguageSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value.trim()) {
      this.languageSearch.emit(`lang/${inputElement.value}?fields=name`);
    }
  }
}
