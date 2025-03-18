import {
  HttpErrorResponse,
  httpResource
} from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { setErrorMessage } from '../error-message';
import { debounceSignal } from '../signal-utilities';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicleUrl = 'https://swapi.py4e.com/api/vehicles';

  enteredModel = signal<string>('');
  // why?
  
  searchText = debounceSignal(this.enteredModel, 600);

  // Original code, moved to the debounceSignal function
  // searchText$ = toObservable(this.selectedModel).pipe(
  //    debounceTime(400)
  // );
  // searchText = toSignal(this.searchText$);

  // Using ** resource() ** with a parameter
  // private vehiclesResource = resource({
  //    request: this.searchText,
  //    loader: (param) => fetch(`${this.vehicleUrl}?search=${param.request}`)
  //       .then(res => res.json() as Promise<VehicleResponse>)
  // });

  // private http = inject(HttpClient);
  // // Using ** rxResource() ** with a parameter
  // private vehiclesResource = rxResource({
  //    request: this.searchText,
  //    loader:(param) => {
  //       return this.http.get<VehicleResponse>(
  //          `${this.vehicleUrl}?search=${param.request}`).pipe(
  //             map(vr => vr.results)
  //          )
  //    }
  // });
  // vehicles = computed(() => this.vehiclesResource.value() ?? [] as Vehicle[]);

  // Using ** httpResource() ** with a parameter
  private vehiclesResource = httpResource<VehicleResponse>(
    () => `${this.vehicleUrl}?search=${this.searchText()}`
  );
  vehicles = computed(
    () => this.vehiclesResource.value()?.results ?? ([] as Vehicle[])
  );

  error = computed(() => this.vehiclesResource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Vehicle'));
  isLoading = this.vehiclesResource.isLoading;
}

export interface VehicleResponse {
  count: number;
  next: string;
  previous: string;
  results: Vehicle[];
}

export interface Vehicle {
  name: string;
  cost_in_credits: number;
  model: string;
}
