import { Routes } from '@angular/router';
import { OrphanObservableComponent } from './orphan-observable/orphan-observable.component';
import { OrphanSignalHttpresourceReactiveFormComponent } from './orphan-signal-httpresource-reactiveForm/orphan-signal-httpresource-reactiveForm.component';
import { OrphanSignaldHttpResourceSignalComponent } from './orphan-signal-httpresource-signal/orphan-signal-httpresource-signal.component';
import { OrphanSignalHttpResourceComponent } from './orphan-signal-httpresource/orphan-signal-httpresource.component';
import { OrphanSignalInputPatternNestedComponent } from './orphan-signal-input-pattern-nested/orphan-signal-input-pattern-nested.component';
import { OrphanSignalInputPatternComponent } from './orphan-signal-input-pattern/orphan-signal-input-pattern.component';
import { OrphanSignalModelComponent } from './orphan-signal-model/orphan-signal-model.component';
import { OrphanSignalNestedComponent } from './orphan-signal-nested/orphan-signal-nested.component';
import { OrphanSignalSimpleComponent } from './orphan-signal-simple/orphan-signal-simple.component';
import { OrphanSignalComponent } from './orphan-signal/orphan-signal.component';
import { ParentComponent } from './SoC/input-output/parent.component';
import { ParentInputSignalComponent } from './SoC/input-signal/parent-input-signal.component';

export const routes: Routes = [
  { path: 'SoC/input-output', component: ParentComponent },
  { path: 'SoC/input-signal', component: ParentInputSignalComponent },
  { path: 'orphan-observable', component: OrphanObservableComponent },
  { path: 'orphan-signal', component: OrphanSignalComponent },
  { path: 'orphan-signal-simple', component: OrphanSignalSimpleComponent },
  { path: 'orphan-signal-nested', component: OrphanSignalNestedComponent },
  {
    path: 'orphan-signal-httpresource',
    component: OrphanSignalHttpResourceComponent,
  },
  {
    path: 'orphan-signal-httpresource-reactiveForm',
    component: OrphanSignalHttpresourceReactiveFormComponent,
  },
  {
    path: 'orphan-signal-httpresource-signal',
    component: OrphanSignaldHttpResourceSignalComponent,
  },
  {
    path: 'orphan-signal-input-pattern',
    component: OrphanSignalInputPatternComponent,
  },
  {
    path: 'orphan-signal-input-pattern-nested',
    component: OrphanSignalInputPatternNestedComponent,
  },
  { path: 'orphan-signal-model', component: OrphanSignalModelComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
