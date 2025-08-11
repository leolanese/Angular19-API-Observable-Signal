import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { APISignalService } from './api-signal.service';

@Component({
  selector: 'app-orphan-signal-simple',
  imports: [NgFor],
  providers: [APISignalService],
  template: `
    <ul>
      <li *ngFor="let item of apiSignalService.data$()">
        {{ item.title }}
      </li>
    </ul>
  `,
})
export class OrphanSignalSimpleComponent {
  apiSignalService = inject(APISignalService);

  ngOnInit(): void {
    const url = `https://jsonplaceholder.typicode.com/posts`

    this.apiSignalService.getSignalData(url); // Fetch data when the component initialises
  }

}
