import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, debounceTime, of, shareReplay, throwError } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class APIService {
  // constructor-based dependency injection
  http = inject(HttpClient);
  apiUrl = `https://restcountries.com/v3.1/`;

  // Generic Type Parameter <T>
  // T can replaced with: user, photos, comments, etc
  // The method returns an Observable of type T
  get<T>(url: string): Observable<T[]> {
    console.log('Fetching data from URL:', `${this.apiUrl}${url}`);

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