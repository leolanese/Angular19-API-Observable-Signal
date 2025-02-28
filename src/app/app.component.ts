import {Component} from '@angular/core';
import {RouterModule,RouterOutlet} from '@angular/router';
import {OrphanObservableComponent} from './orphan-observable/orphan-observable.component';
import {OrphanSignalPayloadNestedComponent} from './orphan-signal-payload-nested/orphan-signal-payload-nested.component';
import {OrphanSignalPayloadSimpleComponent} from './orphan-signal-payload-simple/orphan-signal-payload-simple.component';
import {OrphanSignalComponent} from './orphan-signal/orphan-signal.component';
import {ParentComponent} from './SoC/parent.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    ParentComponent,
    OrphanObservableComponent,
    OrphanSignalComponent,
    OrphanSignalPayloadSimpleComponent,
    OrphanSignalPayloadNestedComponent
  ],
  template: `
    <nav>
      <a routerLink="">#️⃣ Root</a>
      <a routerLink="/SoC">1️⃣ SoC Parent <-> Child API Observable</a>
      <a routerLink="/orphan-observable">2️⃣ Orphan Observable</a>
      <a routerLink="/orphan-signal">3️⃣ Orphan Signal</a>
      <a routerLink="/orphan-signal-payload-simple">4️⃣ Signal Payload Simple</a>
      <a routerLink="/orphan-signal-payload-nested">5️⃣ Signal Payload Nested</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`a {font-size: 1.5em}`],
})
export class AppComponent {
  
}
