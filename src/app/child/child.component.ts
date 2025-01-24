import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  imports: [CommonModule, AsyncPipe],
  template: `
    child

    <button (click)="toParent.emit()">Fetch Data</button>

    <ul>
      @for (user of users$ | async; track user.id) {
        <li>
          <p>ID: {{ user.id }}</p>
          <p>Username: {{ user.username }}</p>
          <p>Email: {{ user.email }}</p>
        </li>
      } @empty {
        <li>Loading...</li>
      }
    </ul>
  `,
  styles: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Output()  // -> P
  toParent: EventEmitter<string> = new EventEmitter();

  @Input() // C <-
  users$!: Observable<any[]>; 
  // TS non-null assertion operator
  // avoids unnecessary null/undefined checks when working with @Input()
}
