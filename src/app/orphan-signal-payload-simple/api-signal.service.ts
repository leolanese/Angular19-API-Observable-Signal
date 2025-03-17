import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, debounceTime, Observable, of, shareReplay, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class APISignalService {
  // constructor-based dependency injection
  private http = inject(HttpClient);

  private items = signal<any[]>([]);
  private data = signal<any | null>(null);

  // Expose Signals as computed properties as read-only access
  readonly items$ = computed(() => this.items());
  readonly data$ = computed(() => this.data());

/**
* 
- This private method handles the core logic of fetching data from a URL, including logging, debouncing, caching, and error handling.
- It returns an observable, which can be used directly or subscribed to for further processing.
*/
  private fetchData<T>(url: string): Observable<T[]> {
    console.log('Fetching data from URL:', `${url}`);

    return this.http.get<T[]>(url).pipe(
      debounceTime(300),
      shareReplay(1), // Caches + replays the latest value to any new subscribers
      catchError((error) => {
        if (error.status === 404) {
          console.warn(`Resource not found for URL: ${url}`);
          return of([]); // Return empty array or fallback data on 404
        }
        console.error('Error fetching data:', error);
        return throwError(() => new Error('Failed to fetch data.'));
      })
    );
  }

/**
- Calls fetchData to fetch the data and subscribes to the observable to update the signal with the fetched data.
- Logs any errors that occur during the fetch operation.
- Returns the observable for further use if needed. This allows the caller to perform additional operations on the observable if required.
*/
  getSignalData(url: string): Observable<any[]> {
    console.log('Fetching data from URL:', `${url}`);

    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        this.data.set(response); // Update the Signal with the API response
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });

    return this.fetchData<any>(url);
  }
}