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
  private url = 'https://swapi.py4e.com/api/vehicles';

  searchModel = signal<string>('');
  // why debouncing here?
  // The httpResource makes HTTP requests based on the search text. Without debouncing, each character typed would create a new HTTP request, most of which would be immediately cancelled as new ones are made.
  // If you removed the debounce, you would likely see performance issues and a degraded user experience, especially with slower network connections or when dealing with larger datasets.
  searchText = debounceSignal(this.searchModel, 300);

  // Using ** httpResource() ** with a parameter
  private itemsResource = httpResource<any>(
    () => `${this.url}?search=${this.searchText()}`
  );

  items = computed(
    () => this.itemsResource.value()?.results ?? ([] as any[])
  );

  error = computed(() => this.itemsResource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Item'));
  isLoading = this.itemsResource.isLoading;
}

