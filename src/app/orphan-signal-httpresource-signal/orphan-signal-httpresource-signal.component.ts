import { Component, inject } from '@angular/core';
import { ServiceAPI } from './serviceAPI';

@Component({
  selector: 'app-orphan-signal-httpresource-signal',
  imports: [],
  template: `
      <label>Search: </label>
      <input 
        [value]="searchSignal()"
        (input)="onSearch($event)" />

      @if (isLoading()) {
        <div>Loading...</div>
      } @else if (errorMessage()){
        <div style='color: red'>An error occurred: {{ errorMessage() }}</div>
      } @else {
        @if (items().length) {
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Cost</th>
                <th>Manufacture</th>
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
                <!-- <pre>{{ item | json }}</pre> -->
              }
            </tbody>
          </table>
        } @else {
          <div>No elements found</div>
        }
      }
  `,
})
export class OrphanSignaldHttpResourceSignalComponent {
   private serviceApi = inject(ServiceAPI);

   searchSignal = this.serviceApi.searchSignal;

   onSearch(event: Event) {
     const value = (event.target as HTMLInputElement).value;
     this.searchSignal.set(value);
   }

   // Signals to support the template
   isLoading = this.serviceApi.isLoading;
   errorMessage = this.serviceApi.errorMessage;
   items = this.serviceApi.items;
   
}
