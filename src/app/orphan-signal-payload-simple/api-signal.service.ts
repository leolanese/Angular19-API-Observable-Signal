import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, shareReplay, throwError } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class APISignalService {
  // constructor-based dependency injection
  private http = inject(HttpClient);

  private items = signal<any[]>([]);
  private data = signal<any | null>(null);

  // Expose Signals as computed properties for read-only access
  readonly items$ = computed(() => this.items());
  readonly data$ = computed(() => this.data());

  apiUrl = 'https://restcountries.com/v3.1/';

  fetchData<T = any>(term: string): void {
    const url = `${this.apiUrl}${term}`;
    this.http.get<T[]>(url).pipe(
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(data => {
      this.items.set(data); // Update the Signal with the fetched data
    });
  }

    get<T>(url: string): Observable<T[]> {
    console.log('Fetching data from URL:', `${url}`);

    return this.http.get<T[]>(url).pipe(
      debounceTime(300),
      shareReplay(1), // Caches + replays the latest value to any new subscribers
      catchError( error => {
        if (error.status === 404) {
          console.warn(`Resource not found for URL: ${url}`);
          return of([]);  // Return empty array or fallback data on 404
        }
        console.error('Error fetching data:', error);
        return throwError(() => new Error('Failed to fetch data.'));
      })
    );
  }

  selectCountry(countryName: string): void {
    const url = `${this.apiUrl}name/${countryName}?fields=name,flags`;
    this.http.get<any[]>(url).pipe(
      map(data => data[0]),
      takeUntilDestroyed()
    ).subscribe(data => {
      this.data.set(data); // Update the Signal with the selected country
    });
  }

  //TODO: hold the payload in a signal
  getSignalData(url: string){
    console.log('Fetching data from URL:', `${url}`);

    this.http.get<any[]>(url)
      .subscribe({
        next: (response) => {
          this.data.set(response); // Update the Signal with the API response
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        },
      });
  }
}