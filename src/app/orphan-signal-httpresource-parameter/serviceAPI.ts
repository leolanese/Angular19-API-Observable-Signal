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
export class ServiceAPI {
  http = inject(HttpClient);
  baseUrl = 'https://swapi.dev/api/vehicles';

  // Public signals
  searchSignal = signal('');
  items = signal<Vehicle[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    // Watch for search changes
    effect(() => {
      this.fetchVehicles(this.searchSignal());
    });
  }

  private async fetchVehicles(search: string) {
    try {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      
      const url = search 
        ? `${this.baseUrl}?search=${search}`
        : this.baseUrl;
        
      const response = await firstValueFrom(
        this.http.get<VehicleResponse>(url)
      );
      this.items.set(response.results);
    } catch (err) {
      this.errorMessage.set('Failed to fetch vehicles');
      this.items.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }
} 