import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, debounceTime, shareReplay, throwError } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class APIService {
  // constructor-based dependency injection
  http = inject(HttpClient);
  apiUrl = `https://restcountries.com/v3.1/`;

  // Generic Type Parameter <T>
  // T can replaced with: user, photos, comments, etc
  // The method returns an Observable of type T
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      debounceTime(300),
      shareReplay(1), // Caches + replays the latest value to any new subscribers
      catchError( error => {
        console.error('Error fetching data:', error);
        return throwError(() => new Error('Failed to fetch data.'));
      })
    );
  }

}