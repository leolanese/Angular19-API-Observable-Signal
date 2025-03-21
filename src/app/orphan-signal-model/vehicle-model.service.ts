import { httpResource } from '@angular/common/http';
import { Injectable, computed, model } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VehicleModelService {
  private readonly baseUrl = 'https://swapi.dev/api/vehicles';

  // Using model() instead of signal for two-way binding support
  searchTerm = model<string>('');

  // Using httpResource() with a search parameter
  private vehiclesResource = httpResource<any>(
    () => ({ 
      url: `${this.baseUrl}${this.searchTerm() ? `?search=${this.searchTerm()}` : ''}`,
      method: 'GET',
    }),
    { defaultValue: undefined }
  );

  // Computed signals for the template
  isLoading = this.vehiclesResource.isLoading;
  error = computed(() => {
    const err = this.vehiclesResource.error();
    return err ? 'Failed to fetch vehicles' : null;
  });
  vehicles = computed(() => this.vehiclesResource.value()?.results || []);
} 