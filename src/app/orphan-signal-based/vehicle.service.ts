import { httpResource } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private baseUrl = 'https://swapi.dev/api/vehicles';

  // Input signal for search text
  searchTerm = signal<string>('');

  // Using httpResource() with a search parameter
  private vehiclesResource = httpResource<any>(
    () => ({ 
      url: `${this.baseUrl}${this.searchTerm() ? `?search=${this.searchTerm()}` : ''}`
    })
  );

  // Computed signals for the template
  isLoading = this.vehiclesResource.isLoading;
  error = computed(() => {
    const err = this.vehiclesResource.error();
    return err ? 'Failed to fetch vehicles' : null;
  });
  vehicles = computed(() => this.vehiclesResource.value()?.results || []);
} 