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
export class ServiceAPI {
  private readonly url = 'https://swapi.py4e.com/api/vehicles';

  // Input signal for search text
  searchSignal = signal<string>('');

  // Debounced signal to prevent too many API calls
  searchValue = debounceSignal(this.searchSignal, 300);

  // Using httpResource() with a parameter
  private itemsResource = httpResource<any>(
    () => `${this.url}?search=${this.searchValue()}`
  );

  // Computed signals for the template
  isLoading = this.itemsResource.isLoading;
  errorMessage = computed(() => setErrorMessage(this.error(), 'Item'));
  items = computed(() => this.itemsResource.value()?.results ?? []);
  error = computed(() => this.itemsResource.error() as HttpErrorResponse);
  
}

