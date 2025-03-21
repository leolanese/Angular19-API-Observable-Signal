import { Component, inject } from '@angular/core';
import { VehicleModelService } from './vehicle-model.service';

@Component({
  selector: 'app-orphan-signal-model',
  standalone: true,
  template: `
    <label>Search: </label>
    <input [model]="vehicleService.searchTerm">

    @if (vehicleService.isLoading()) {
      <div>Loading...</div>
    } @else if (vehicleService.error()) {
      <div style='color: red'>{{ vehicleService.error() }}</div>
    } @else if (vehicleService.vehicles().length) {
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Model</th><th>Cost</th><th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          @for (vehicle of vehicleService.vehicles(); track vehicle) {
            <tr>
              <td>{{ vehicle.name }}</td>
              <td>{{ vehicle.model }}</td>
              <td>{{ vehicle.cost_in_credits }}</td>
              <td>{{ vehicle.manufacturer }}</td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <div>No vehicles found</div>
    }
  `
})
export class OrphanSignalModelComponent {
  vehicleService = inject(VehicleModelService);
} 