import { Signal, WritableSignal } from '@angular/core';

export interface Vehicle {
  name: string;
  model: string;
  cost_in_credits: string;
  manufacturer: string;
}

export interface VehicleResponse {
  results: Vehicle[];
}

export interface ServiceAPI {
  items: Signal<Vehicle[]>;
  isLoading: Signal<boolean>;
  errorMessage: Signal<string | null>;
  searchSignal: WritableSignal<string>;
} 