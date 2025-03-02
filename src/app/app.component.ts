import {Component} from '@angular/core';
import {RouterModule,RouterOutlet} from '@angular/router';
import {OrphanObservableComponent} from './orphan-observable/orphan-observable.component';
import {OrphanSignalPayloadNestedComponent} from './orphan-signal-payload-nested/orphan-signal-payload-nested.component';
import {OrphanSignalPayloadSimpleComponent} from './orphan-signal-payload-simple/orphan-signal-payload-simple.component';
import {OrphanSignalComponent} from './orphan-signal/orphan-signal.component';
import {ParentComponent} from './SoC/input-output/parent.component';
import {ParentInputSignalComponent} from './SoC/input-signal/parent-input-signal.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    ParentComponent,
    ParentInputSignalComponent,
    OrphanObservableComponent,
    OrphanSignalComponent,
    OrphanSignalPayloadSimpleComponent,
    OrphanSignalPayloadNestedComponent
  ],
  template: `
    <h1>{{ title }}</h1>
    <nav>
      <a routerLink="">#️⃣</a>
      <a routerLink="/SoC/input-output">0️⃣ SoC Parent <-> Child API Observable API Nested</a>
      <a routerLink="/SoC/input-signal">1️⃣ SoC Parent <-> Child, input-signal, API Observable API Nested</a>
      <a routerLink="/orphan-observable">2️⃣ Orphan Observable</a>
      <a routerLink="/orphan-signal">3️⃣ Orphan Signal</a>
      <a routerLink="/orphan-signal-payload-simple">4️⃣ Orphan Signal Payload API Simple</a>
      <a routerLink="/orphan-signal-payload-nested">5️⃣ Orphan Signal Payload API Nested</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`a {font-size: 2em; display: block;}`],
})
export class AppComponent {
  title = 'Angular 19, API request using Observable and Signal';
}
