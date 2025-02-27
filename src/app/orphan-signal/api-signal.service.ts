import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, debounceTime, Observable, of, shareReplay, throwError } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class APISignalService {
  // constructor-based dependency injection
  private http = inject(HttpClient);

  items = signal<any[]>([]);
  private data = signal<any | null>(null);

  // Expose Signals as computed properties for read-only access
  readonly items$ = computed(() => this.items());
  readonly data$ = computed(() => this.data());

  apiUrl = 'https://restcountries.com/v3.1/';


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


}