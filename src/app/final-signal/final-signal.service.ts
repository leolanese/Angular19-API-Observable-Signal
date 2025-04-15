import { httpResource } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';

export interface Vehicle {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable()
export class FinalSignalService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  // Search term signal
  searchTerm = signal<string>('');

  // HTTP Resource for vehicles
  private vehiclesResource = httpResource<Vehicle[]>(
    () => ({
      url: `${this.baseUrl}/posts${this.searchTerm() ? `?q=${this.searchTerm()}` : ''}`,
      method: 'GET'
    }),
    { defaultValue: [] }
  );

  // Computed signals for the template
  isLoading = this.vehiclesResource.isLoading;
  error = computed(() => {
    const err = this.vehiclesResource.error();
    return err ? 'Failed to fetch items' : null;
  });
  vehicles = computed(() => this.vehiclesResource.value() || []);

  // Method to update search term
  updateSearch(term: string): void {
    this.searchTerm.set(term);
    this.vehiclesResource.reload();
  }
} 