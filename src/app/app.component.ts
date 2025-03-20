import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OrphanObservableComponent } from './orphan-observable/orphan-observable.component';
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
    OrphanSignalNestedComponent
  ],
  template: `
    <h1>{{ title }}</h1>
    <nav>
      <a routerLink="">#️⃣</a>
      <a routerLink="/SoC/input-output">🔴 SoC Parent <-> Child API Observable API Nested</a>
      <a routerLink="/SoC/input-signal">🔴 SoC Parent <-> Child, input-signal, API Observable API Nested</a>
      <a routerLink="/orphan-observable">🟡 Orphan Observable</a>
      <a routerLink="/orphan-signal">🟡 Orphan Signal</a>
      <a routerLink="/orphan-signal-simple">🟡 Orphan Signal API Simple</a>
      <a routerLink="/orphan-signal-nested">🟡 Orphan Signal API Nested</a>
      <a routerLink="/orphan-signal-httpresource">🔵 Orphan Signal API Simple HttpResource</a>
      <a routerLink="/orphan-signal-httpresource-reactiveForm">🔵 Orphan Signal API Simple HttpResource reactive form</a>
      <a routerLink="/orphan-signal-httpresource-signal">🔵 Orphan Signal API Simple HttpResource</a>
      <a routerLink="/orphan-signal-based">🟢 Orphan signal-based API Simple HttpResource</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`a {font-size: 2em; display: block;}`],
})
export class AppComponent {
  title = 'Angular 19.2+, API request using Observable, Signal and httpResource';
}
