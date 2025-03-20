import { Component, inject } from '@angular/core';
import { ServiceAPI } from './serviceAPI';

@Component({
  selector: 'app-orphan-signal-httpresource-parameter',
  standalone: true,
  template: `
    <label>Search: </label>
    <input 
      [value]="searchSignal()" 
      (input)="updateSearch($event)"
    >

    @if (isLoading()) {
      <div>Loading...</div>
    } @else if (errorMessage()) {
      <div style='color: red'>{{ errorMessage() }}</div>
    } @else if (items().length) {
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Model</th><th>Cost</th><th>Manufacture</th>
          </tr>
        </thead>
        <tbody>
          @for (item of items(); track item) {
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.model }}</td>
              <td>{{ item.cost_in_credits }}</td>
              <td>{{ item.manufacturer }}</td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <div>No elements found</div>
    }
  `
})
export class OrphanSignalHttpresourceParameterComponent {
  api = inject(ServiceAPI) as any;

  // Direct signal references 
  items = this.api.items;
  isLoading = this.api.isLoading;
  errorMessage = this.api.errorMessage;
  searchSignal = this.api.searchSignal;

  // Signal-based event handler
  updateSearch = (e: Event) => 
    this.searchSignal.set((e.target as HTMLInputElement).value);
} 