import { Component, inject } from '@angular/core';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-orphan-signal-based',
  standalone: true,
  template: `
    <label>Search: </label>
    <input 
      [value]="vehicleService.searchTerm()" 
      (input)="onSearch($event)"
    >

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
export class OrphanSignalBasedComponent {
  vehicleService = inject(VehicleService);

   // Function to update the search
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.vehicleService.searchTerm.set(value);
  }
} 