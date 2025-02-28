import {HttpClient} from '@angular/common/http';
import {inject,Injectable,signal} from '@angular/core';
import {catchError,debounceTime,map,of,shareReplay,throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class APISignalService {
  private http = inject(HttpClient);

  // Signals to hold state `list of countries` and `single selected country`
  items = signal<any[]>([]);
  data = signal<any | null>(null);

  apiUrl = 'https://restcountries.com/v3.1/';

  fetchData<T = any>(term: string): void {
    const url = `${this.apiUrl}${term}`;

    this.http.get<T[]>(url).pipe(
      debounceTime(300), // Debounce API calls
      shareReplay(1), // Cache the response for subsequent subscribers
      catchError( error => {
        if (error.status === 404) {
          console.warn(`Resource not found for URL: ${url}`);
          return of([]);  // Return empty array or fallback data on 404
        }
        console.error('Error fetching data:', error);
        return throwError(() => new Error('Failed to fetch data.'));
      })
    ).subscribe({
      next: (data) => {
        this.items.set(data); // Update the Signal with the fetched data
      },
      error: () => {
        this.items.set([]); // Reset the Signal on error
      },
    });
  }

  selectCountry(countryName: string): void {
    const url = `${this.apiUrl}name/${countryName}?fields=name,flags`;

    this.http.get<any[]>(url).pipe(
      map(data => data[0]),
      catchError( error => {
        if (error.status === 404) {
          console.warn(`Resource not found for URL: ${url}`);
          return of([]);  // Return empty array or fallback data on 404
        }
        console.error('Error fetching data:', error);
        return throwError(() => new Error('Failed to fetch data.'));
      })
    ).subscribe({
      next: (data) => {
        this.data.set(data); // Update the Signal with the fetched data
      },
      error: () => {
        this.items.set([]); // Reset the Signal on error
      },
    });
  }
}