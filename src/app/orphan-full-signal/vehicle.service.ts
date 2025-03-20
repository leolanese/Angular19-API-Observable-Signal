import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface Vehicle {
  name: string;
  model: string;
  cost_in_credits: string;
  manufacturer: string;
}

interface VehicleResponse {
  results: Vehicle[];
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  #http = inject(HttpClient);
  #baseUrl = 'https://swapi.dev/api/vehicles';

  // Public signals
  searchTerm = signal('');
  vehicles = signal<Vehicle[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    // Watch for search changes
    effect(() => {
      this.fetchVehicles(this.searchTerm());
    });
  }

  private async fetchVehicles(search: string) {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const url = search 
        ? `${this.#baseUrl}?search=${search}`
        : this.#baseUrl;
        
      const response = await firstValueFrom(
        this.#http.get<VehicleResponse>(url)
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