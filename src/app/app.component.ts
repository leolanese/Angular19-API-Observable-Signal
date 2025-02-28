import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrphanObservableComponent } from './orphan-observable/orphan-observable.component';
import { OrphanSignalPayloadNestedComponent } from './orphan-signal-payload-nested/orphan-signal-payload-nested.component';
import { OrphanSignalPayloadSimpleComponent } from './orphan-signal-payload-simple/orphan-signal-payload-simple.component';
import { OrphanSignalComponent } from './orphan-signal/orphan-signal.component';
import { ParentComponent } from './SoC/parent/parent.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ParentComponent,
    OrphanObservableComponent,
    OrphanSignalComponent,
    OrphanSignalPayloadSimpleComponent,
    OrphanSignalPayloadNestedComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test';
}
