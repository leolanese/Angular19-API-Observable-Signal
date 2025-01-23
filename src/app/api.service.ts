import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, debounceTime, shareReplay, throwError } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class APIService {
  // constructor-based dependency injection
  http = inject(HttpClient);
  apiRootUrl = "https://jsonplaceholder.typicode.com/";

  // Generic method to make GET requests with optional caching
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      debounceTime(300),
      shareReplay(1), // Cache the response to avoid multiple requests
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(() => new Error('Failed to fetch data.'));
      })
    );
  }

}