import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleService } from './serviceAPI';

@Component({
  selector: 'app-orphan-signal-payload-httpresource-parameter',
  imports: [FormsModule],
  template: `
      <label for="model">Search string: </label>
      <input type="text"
              id="model"
              name="model"
              [(ngModel)]="searchModel">

      @if (isLoading()) {
        <div>... loading vehicles</div>
      } @else if (errorMessage()){
        <div style='color: red'>An error occurred: {{ errorMessage() }}</div>
      } @else {
        @if (vehicles().length) {
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Cost (in credits)</th>
              </tr>
            </thead>
            <tbody>
              @for (vehicle of vehicles(); track vehicle) {
                <tr>
                  <td>{{ vehicle.name }}</td>
                  <td>{{ vehicle.model }}</td>
                  <td>{{ vehicle.cost_in_credits }}</td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <div>No vehicles found</div>
        }
      }
  `,
  standalone: true
})
export class OrphanSignalPayloadHttpresourceParameterComponent {
   // Injected services
   private vehicleService = inject(VehicleService);

   // Signals to support the template
   vehicles = this.vehicleService.vehicles;
   isLoading = this.vehicleService.isLoading;
   errorMessage = this.vehicleService.errorMessage;
   searchModel = this.vehicleService.searchModel;
}
