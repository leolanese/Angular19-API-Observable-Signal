import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { APIService } from '../api.service';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [AsyncPipe, ChildComponent],
  template: `
    <p>
      parent works!
    </p>

    <app-child 
      (notifyParent)="fetchData('users')"  
      [users$]="data$"
    />
  `,
  styles: ``,
  standalone: true,
})
export class ParentComponent {
  // Initialise to an empty observable
  data$!: Observable<any[]> 

  apiService = inject(APIService)
  destroyRef = inject(DestroyRef);

  // smart component fully reusable with generic type
  // <T> is a generic placeholder
  // here the 'lance shape generic': <T>(term:string) will be replace by <user>
  fetchData<T>(term: string): void {
    const url = `${this.apiService.apiRootUrl}${term}`;

    this.data$ = this.apiService.get<T[]>(url).pipe(
      distinctUntilChanged(), // emit ONLY, if data has changed from previous emission
      takeUntilDestroyed(this.destroyRef) // Clean up subscriptions
    );
  }

}
