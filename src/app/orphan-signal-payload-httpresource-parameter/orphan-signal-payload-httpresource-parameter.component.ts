import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ServiceAPI } from './serviceAPI';

@Component({
  selector: 'app-orphan-signal-payload-httpresource-parameter',
  imports: [ReactiveFormsModule],
  template: `
      <label for="model">Search string: </label>
      <input type="text"
              id="model"
              name="model"
              [formControl]="searchControl">

      @if (isLoading()) {
        <div>... loading </div>
      } @else if (errorMessage()){
        <div style='color: red'>An error occurred: {{ errorMessage() }}</div>
      } @else {
        @if (items().length) {
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Cost (in credits)</th>
              </tr>
            </thead>
            <tbody>
              @for (item of items(); track item) {
                <tr>
                  <td>{{ item.name }}</td>
                  <td>{{ item.model }}</td>
                  <td>{{ item.cost_in_credits }}</td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <div>No elements found</div>
        }
      }
  `,
})
export class OrphanSignalPayloadHttpresourceParameterComponent {
   // Injected services
   private serviceApi = inject(ServiceAPI);

  searchControl = new FormControl('');
  
    constructor() {
    // You can now use valueChanges observable
    this.searchControl.valueChanges.subscribe((value: string | null) => {
      // Handle value changes
       this.serviceApi.searchModel.set(value ?? '');
    });
  }

   // Signals to support the template
   items = this.serviceApi.items;
   isLoading = this.serviceApi.isLoading;
   errorMessage = this.serviceApi.errorMessage;
   searchModel = this.serviceApi.searchModel;
}
