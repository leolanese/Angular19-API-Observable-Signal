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

  destroyRef = inject(DestroyRef);
  apiService = inject(APIService)

  // smart component fully reusable with generic type
  fetchData<T>(term: any): void {
    const url = `${this.apiService.apiRootUrl}${term}`;

    this.data$ = this.apiService.get<T[]>(url).pipe(
      distinctUntilChanged(), // Only emit if the data has changed
      takeUntilDestroyed(this.destroyRef) // Clean up subscriptions
    );
  }

}
