import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SignalService } from './final-signal.service';

@Component({
  selector: 'app-final-signal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="vehicle-search">
      <!-- Modern form control with signal binding -->
      <input 
        type="text" 
        placeholder="Search posts..." 
        [value]="signalService.searchTerm()" 
        (input)="onSearch($event)" 
      />

      <!-- Loading state with skeleton -->
      @if (signalService.isLoading()) { 
        <div>Loading posts...</div> 
      } @else if (signalService.error()) { 
       <div class="error-message">
          <span class="error-icon">⚠️</span>
          {{ signalService.error() }}
        </div> 
      } @else { 
        <div class="vehicle-grid">
          @for (post of signalService.posts(); track post.id) { 
            <div class="vehicle-card">
              <h3>{{ post.title }}</h3>
              <div class="vehicle-details">
                <p><strong>Post ID:</strong> {{ post.id }}</p>
                <p><strong>User ID:</strong> {{ post.userId }}</p>
                <p><strong>Content:</strong> {{ post.body }}</p>
              </div>
            </div>
          }
        </div> 
      }
    </div>
  `,
  styleUrl: './final-signal.scss'
})
export class FinalSignalComponent {
  protected readonly signalService = inject(SignalService);

  // Event handlers named for what they do, not the triggering event
  protected onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.signalService.updateSearch(value);
  }
} 