import { httpResource } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VehicleModelService {
  private readonly baseUrl = 'https://swapi.dev/api/vehicles';

  // Using signal instead of model as model() is only for components/directives
  searchTerm = signal<string>('');

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