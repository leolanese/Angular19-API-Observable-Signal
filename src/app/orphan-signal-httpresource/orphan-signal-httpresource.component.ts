import { CommonModule, JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'orphan-signal-httpresource',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  template: `
    <button (click)="createUser()">Create User</button>

    @if (createUserResource.isLoading()) {
      <p>Creating users...</p>
      } @else if (createUserResource.error()) {
      <pre>{{ createUserResource.error() | json }}</pre>
      } @else { @if (createUserResource.value()) {
      <div *ngIf="createUserResource.value()">
        <!-- Log the value to inspect the data structure -->
        <pre>{{ createUserResource.value() | json }}</pre>
        <div *ngFor="let user of createUserResource.value()?.data">
          User created: {{ user?.name || 'No name provided' }} (ID:
          {{ user?.id || 'N/A' }})
          {{ user | json }}
        </div>
      </div>
      } @else {
      <div>No vehicles found</div>
      } 
    }

    <!-- to store usersResource.value() in the template -->
    @let usersData = usersResource.value(); @if (usersResource.isLoading()) {
      <p>Loading users...</p>
    } @else { @if ((usersData?.data?.length ?? 0) === 0) {
      <p>No users found :(</p>
    } @else {
      <p>Users found:</p>
      <button (click)="prevPage()" [disabled]="page() === 1">Previous</button>
      <button (click)="nextPage()">Next</button>

      <ul>
        @for (user of usersData?.data ?? []; track user.id) {
        <li>
          <img
            [src]="user.avatar"
            alt="{{ user.first_name }} {{ user.last_name }}"
          />
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
export class OrphanSignalHttpResourceComponent {
  // Pagination signal
  page = signal(1);

  // Create a resource for POST request
  createUserResource = httpResource<{ data: any[] }>({
    url: 'https://reqres.in/api/users',
    method: 'POST',
    body: { name: 'Leo' }, // Example request body
  });

  createUser() {
    // not .post()
    // does not have a .post() method, because it is designed to
    // handle HTTP requests reactively, not imperatively.
    this.createUserResource.reload();
  }

  // Using function-based httpResource
  usersResource = httpResource<{ data: any[] }>(
    () => `https://reqres.in/api/users?page=${this.page()}&per_page=6`
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
