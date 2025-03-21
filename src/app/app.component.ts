import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OrphanObservableComponent } from './orphan-observable/orphan-observable.component';
import { OrphanSignalInputPatternNestedComponent } from './orphan-signal-input-pattern-nested/orphan-signal-input-pattern-nested.component';
import { OrphanSignalInputPatternComponent } from './orphan-signal-input-pattern/orphan-signal-input-pattern.component';
import { OrphanSignalModelComponent } from './orphan-signal-model/orphan-signal-model.component';
import { OrphanSignalNestedComponent } from './orphan-signal-nested/orphan-signal-nested.component';
import { OrphanSignalSimpleComponent } from './orphan-signal-simple/orphan-signal-simple.component';
import { OrphanSignalComponent } from './orphan-signal/orphan-signal.component';
import { ParentComponent } from './SoC/input-output/parent.component';
import { ParentInputSignalComponent } from './SoC/input-signal/parent-input-signal.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    ParentComponent,
    ParentInputSignalComponent,
    OrphanObservableComponent,
    OrphanSignalComponent,
    OrphanSignalSimpleComponent,
    OrphanSignalNestedComponent,
    OrphanSignalInputPatternComponent,
    OrphanSignalInputPatternNestedComponent,
    OrphanSignalModelComponent,
  ],
  template: `
    <h1>{{ title }}</h1>
    <nav>
      <a routerLink="">#️⃣</a>

      --- Observable- based
      <a routerLink="/SoC/input-output">🔴 SoC Parent <-> Child API Observable API Nested</a>
      <a routerLink="/orphan-observable">🔴 Orphan Observable</a>
     
      --- Hybrid Observable-Signal based
      <a routerLink="/SoC/input-signal">🔴 SoC Parent <-> Child, input-signal, API Observable API Nested</a>
      <a routerLink="/orphan-signal">🟠 Orphan Signal</a>
      <a routerLink="/orphan-signal-simple">🟠 Orphan Signal API Simple</a>
      <a routerLink="/orphan-signal-nested">🟠 Orphan Signal API Nested</a>
      <a routerLink="/orphan-signal-httpresource">🟡 Orphan Signal Simple API request using HttpResource</a>
      <a routerLink="/orphan-signal-httpresource-reactiveForm">🟡 Orphan Signal API Simple HttpResource + Reactive form</a>
      <a routerLink="/orphan-signal-httpresource-signal">🟡 Orphan Signal API Simple HttpResource</a>

      --- Fully Signal-based
      <a routerLink="/orphan-signal-input-pattern">🟢 Orphan fully Signal-based using signal-input-pattern (1-way binding)</a>
      <a routerLink="/orphan-signal-model">🟢 Orphan fully Signal-based using model() (2-way binding)</a>
      <a routerLink="/orphan-signal-input-pattern-nested">🟢 Orphan fully Signal-based (1-way binding, signal-input-pattern, nested)</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      a {
        font-size: 2em;
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title =
    'Angular (19.2+) API request using RxJS, Observable, Signal hybrid and fully Signal-based';
}
