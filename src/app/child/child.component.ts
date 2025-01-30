import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  imports: [CommonModule, AsyncPipe],
  standalone: true,
  template: `
    child

    <button (click)="toParent.emit()">Fetch Data</button>

    <ul>
      @for (item of items$ | async; let index = $index; track index) {
        <!-- 
          <pre>{{ items$ | async | json }}</pre> 
        -->
        <li>
          <p>ID: {{ item.id }}</p>
          <p>USERNAME: {{ item.username }}</p>
          <p>ADDRESS: {{ item.address?.street }}</p>
        </li>
      } @empty {
          <li>Loading...</li>
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Output()  // -> P
  toParent: EventEmitter<string> = new EventEmitter();

  @Input() // C <-
  items$!: Observable<any[]>; 
  // TS non-null assertion operator
  // avoids unnecessary null/undefined checks when working with @Input()
}
