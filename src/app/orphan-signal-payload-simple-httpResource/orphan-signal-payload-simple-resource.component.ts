import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'orphan-signal-payload-simple-httpResource',
  standalone: true,
  imports: [CommonModule],
  template: `
    // to store usersResource.value() in the template
    @let usersData = usersResource.value();

    @if (usersResource.isLoading()) {
      <p>Loading users...</p>
    } @else {

    @if ((usersResource.value()?.data?.length ?? 0) === 0) {
      <p>No users found :(</p>
    } @else {
      <p>Users found:</p>
      <button (click)="prevPage()" [disabled]="page() === 1">Previous</button>
      <button (click)="nextPage()">Next</button>

      <ul>
        @for (user of usersResource.value()?.data ?? []; track user.id) {
          <li>
            <img [src]="user.avatar" alt="{{ user.first_name }} {{ user.last_name }}" />
            <div>
              <h3>{{ user.first_name }} {{ user.last_name }}</h3>
              <p>{{ user.email }}</p>
            </div>
          </li>
        }
      </ul>
    }
  }
  `,
})
export class OrphanSignalPayloadSimpleResourceComponent {
  // Pagination signal
  page = signal(1);

  // Using function-based httpResource
  usersResource = httpResource<{ data: any[] }>(() =>
    `https://reqres.in/api/users?page=${this.page()}&per_page=6`
  );

  // Pagination methods
  prevPage() {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
      this.usersResource.reload();
    }
  }

  nextPage() {
    this.page.set(this.page() + 1);
    this.usersResource.reload();
  }
}
