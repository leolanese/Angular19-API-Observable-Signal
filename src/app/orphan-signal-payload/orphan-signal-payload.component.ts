import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-orphan-signal-payload',
  imports: [NgFor],
  template: `
      <ul>
        <li *ngFor="let item of apiService.data$()">
          {{ item.title }}
        </li>
      </ul>
  `
})
export class OrphanSignalPayloadComponent {
  apiService = inject(APIService);

  ngOnInit(): void {
    const url = `https://jsonplaceholder.typicode.com/posts`

    this.apiService.getSignalData(url); // Fetch data when the component initializes
  }

}
