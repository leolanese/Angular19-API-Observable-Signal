import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class APISignalService {
  private http = inject(HttpClient);
  apiUrl = 'https://restcountries.com/v3.1/';

  // Signals for state management
  initialSearchTerm = signal<string>('');
  languageSearchTerm = signal<string>('');
  selectedCountryName = signal<string | null>(null);

  // HTTP Resources
  countriesResource = httpResource<any[]>(() => {
    const term = this.initialSearchTerm();
    return term ? `${this.apiUrl}${term}` : undefined;
  });

  languageResource = httpResource<any[]>(() => {
    const term = this.languageSearchTerm();
    return term ? `${this.apiUrl}lang/${term}?fields=name` : undefined;
  });

  selectedCountryResource = httpResource<any>(() => {
    const countryName = this.selectedCountryName();
    return countryName ? `${this.apiUrl}name/${countryName}?fields=name,flags` : undefined;
  });

  // Computed signals for derived state
  items = this.countriesResource.value;
  selectedCountry = this.selectedCountryResource.value;
  isLoading = this.countriesResource.isLoading;
  error = this.countriesResource.error;

  selectCountry(countryName: string): void {
    this.selectedCountryName.set(countryName);
    this.selectedCountryResource.reload();
  }
}
