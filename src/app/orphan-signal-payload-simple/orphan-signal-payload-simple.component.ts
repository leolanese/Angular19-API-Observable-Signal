import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { APISignalService } from './api-signal.service';

@Component({
  selector: 'app-orphan-signal-payload-simple',
  imports: [NgFor],
  template: `
    <ul>
      <li *ngFor="let item of apiSignalService.data$()">
        {{ item.title }}
      </li>
    </ul>
  `,
  standalone: true,
})
export class OrphanSignalPayloadSimpleComponent {
  apiSignalService = inject(APISignalService);

  ngOnInit(): void {
    const url = `https://jsonplaceholder.typicode.com/posts`

    this.apiSignalService.getSignalData(url); // Fetch data when the component initializes
  }

}
