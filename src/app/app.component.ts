import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OrphanObservableComponent} from './orphan-observable/orphan-observable.component';
import {OrphanSignalComponent} from './orphan-signal/orphan-signal.component';
import {ParentComponent} from './parent/parent.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ParentComponent,
    OrphanObservableComponent,
    OrphanSignalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test';
}
