import { Routes } from '@angular/router';
import { OrphanObservableComponent } from './orphan-observable/orphan-observable.component';
import { OrphanSignalPayloadNestedComponent } from './orphan-signal-payload-nested/orphan-signal-payload-nested.component';
import { OrphanSignalPayloadSimpleResourceComponent } from './orphan-signal-payload-simple-httpResource/orphan-signal-payload-simple-resource.component';
import { OrphanSignalPayloadSimpleComponent } from './orphan-signal-payload-simple/orphan-signal-payload-simple.component';
import { OrphanSignalComponent } from './orphan-signal/orphan-signal.component';
import { ParentComponent } from './SoC/input-output/parent.component';
import { ParentInputSignalComponent } from './SoC/input-signal/parent-input-signal.component';

export const routes: Routes = [
  { path: 'SoC', component: ParentComponent }, 
  { path: 'SoC/input-signal', component: ParentInputSignalComponent }, 
  { path: 'orphan-observable', component: OrphanObservableComponent },
  { path: 'orphan-signal', component: OrphanSignalComponent },
  { path: 'orphan-signal-payload-simple', component: OrphanSignalPayloadSimpleComponent },
  { path: 'orphan-signal-payload-nested', component: OrphanSignalPayloadNestedComponent },
  { path: 'orphan-signal-payload-simple-httpResource', component: OrphanSignalPayloadSimpleResourceComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
