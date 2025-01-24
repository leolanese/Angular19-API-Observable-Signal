import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  imports: [CommonModule],
  template: `
    <p>
      child works!
    </p>

   <button (click)="toParent.emit()">Fetch Data</button>

<ul>
  @for (user of users$ | async; track user.id) {
    <li>
    <div>First: {{ first }}: Last {{ last }}</div>
      <h4>ID: {{ user.id }} - {{index}}</h4>
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
}
