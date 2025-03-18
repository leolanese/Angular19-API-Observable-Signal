import {
  HttpErrorResponse,
  httpResource
} from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { setErrorMessage } from './error-message';
import { debounceSignal } from './signal-utilities';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicleUrl = 'https://swapi.py4e.com/api/vehicles';

  searchModel = signal<string>('');
  // why debouncing here?
  // The httpResource makes HTTP requests based on the search text. Without debouncing, each character typed would create a new HTTP request, most of which would be immediately cancelled as new ones are made.
  // If you removed the debounce, you would likely see performance issues and a degraded user experience, especially with slower network connections or when dealing with larger datasets.
  searchText = debounceSignal(this.searchModel, 300);

  // Using ** httpResource() ** with a parameter
  private vehiclesResource = httpResource<any>(
    () => `${this.vehicleUrl}?search=${this.searchText()}`
  );
  vehicles = computed(
    () => this.vehiclesResource.value()?.results ?? ([] as any[])
  );

  error = computed(() => this.vehiclesResource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Vehicle'));
  isLoading = this.vehiclesResource.isLoading;
}

