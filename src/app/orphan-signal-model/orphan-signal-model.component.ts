import { Component, effect, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleModelService } from './vehicle-model.service';

@Component({
  selector: 'app-orphan-signal-model',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label>Search: </label>
    <input [(ngModel)]="searchTerm">

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
  
  // Create a local model that connects to the service's signal
  searchTerm = model<string>('');
  
  constructor() {
    // Initialize with the service value
    this.searchTerm.set(this.vehicleService.searchTerm());
    
    // Set up bidirectional sync between model and service
    
    // Update service when model changes
    effect(() => {
      const currentModelValue = this.searchTerm();
      // Avoid infinite loop by checking if values are different
      if (currentModelValue !== this.vehicleService.searchTerm()) {
        this.vehicleService.searchTerm.set(currentModelValue);
      }
    });
    
    // Update model when service changes
    effect(() => {
      const currentServiceValue = this.vehicleService.searchTerm();
      // Avoid infinite loop by checking if values are different
      if (currentServiceValue !== this.searchTerm()) {
        this.searchTerm.set(currentServiceValue);
      }
    });
  }
} 