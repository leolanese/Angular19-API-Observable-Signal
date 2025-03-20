import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface Vehicle {
  name: string;
  model: string;
  cost_in_credits: string;
  manufacturer: string;
}

interface VehicleResponse {
  results: Vehicle[];
}

@Component({
  selector: 'app-orphan-full-signal',
  standalone: true,
  template: `
    <label>Search: </label>
    <input 
      [value]="searchTerm()" 
      (input)="updateSearch($event)"
    >

    @if (isLoading()) {
      <div>Loading...</div>
    } @else if (error()) {
      <div style='color: red'>{{ error() }}</div>
    } @else if (vehicles().length) {
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Model</th><th>Cost</th><th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          @for (vehicle of vehicles(); track vehicle) {
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
export class OrphanFullSignalComponent {
  http = inject(HttpClient);
  baseUrl = 'https://swapi.dev/api/vehicles';

  // State signals
  searchTerm = signal('');
  isLoading = signal(false);
  error = signal<string | null>(null);
  vehicles = signal<Vehicle[]>([]);

  constructor() {
    // Effect to handle search changes
    effect(() => {
      this.fetchVehicles(this.searchTerm());
    });
  }

  updateSearch = (e: Event) => 
    this.searchTerm.set((e.target as HTMLInputElement).value);

  private async fetchVehicles(search: string) {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const url = search 
        ? `${this.baseUrl}?search=${search}`
        : this.baseUrl;
        
      const response = await firstValueFrom(
        this.http.get<VehicleResponse>(url)
      );
      this.vehicles.set(response.results);
    } catch (err) {
      this.error.set('Failed to fetch vehicles');
      this.vehicles.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }
} 