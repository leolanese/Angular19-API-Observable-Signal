import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ServiceAPI } from './serviceAPI';

@Component({
  selector: 'app-orphan-signal-httpresource-parameter-reactiveForm',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
      <label>Search: </label>
      <input [formControl]="searchControl" />

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
export class OrphanSignalHttpresourceReactiveFormComponent {
   // Injected services
   private serviceApi = inject(ServiceAPI);

   searchControl = new FormControl('');

   constructor() {
     this.searchControl.valueChanges.subscribe(value => {
       this.serviceApi.searchSignal.set(value ?? '');
     });
   }

   // Signals to support the template
   items = this.serviceApi.items;
   isLoading = this.serviceApi.isLoading;
   errorMessage = this.serviceApi.errorMessage;
   searchSignal = this.serviceApi.searchSignal;
}
