import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SignalService } from './final-signal.service';

@Component({
  selector: 'app-final-signal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="posts-container">
      <!-- Header section -->
      <div class="header">
        <h1>Posts Library</h1>
        <p class="subtitle">Search and browse through our collection of posts</p>
      </div>

      <!-- Search section -->
      <div class="search-section">
        <div class="search-wrapper">
          <input 
            type="text" 
            placeholder="Search posts by title or content..." 
            [value]="signalService.searchTerm()" 
            (input)="onSearch($event)" 
            class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>
        @if (signalService.searchTerm()) {
          <div class="search-info">
            Searching for: "{{ signalService.searchTerm() }}"
          </div>
        }
      </div>

      <!-- Content section -->
      <div class="content-section">
        @if (signalService.isLoading()) { 
          <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading posts...</p>
          </div>
        } @else if (signalService.error()) { 
          <div class="error-state">
            <div class="error-icon">⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p>{{ signalService.error() }}</p>
            <button class="retry-button" (click)="retry()">Try Again</button>
          </div>
        } @else { 
          <div class="results-section">
            <div class="results-header">
              <h2>Posts ({{ signalService.posts().length }})</h2>
              @if (signalService.posts().length === 0 && signalService.searchTerm()) {
                <p class="no-results">No posts found matching your search.</p>
              }
            </div>
            
            <div class="posts-grid">
              @for (post of signalService.posts(); track post.id) { 
                <article class="post-card">
                  <div class="post-header">
                    <h3 class="post-title">{{ post.title }}</h3>
                    <div class="post-meta">
                      <span class="post-id">#{{ post.id }}</span>
                      <span class="user-id">User {{ post.userId }}</span>
                    </div>
                  </div>
                  
                  <div class="post-content">
                    <p>{{ post.body }}</p>
                  </div>
                  
                  <div class="post-footer">
                    <button class="read-more-btn">Read More</button>
                    <div class="post-actions">
                      <button class="action-btn" title="Like">👍</button>
                      <button class="action-btn" title="Share">📤</button>
                      <button class="action-btn" title="Bookmark">🔖</button>
                    </div>
                  </div>
                </article>
              }
            </div>
          </div>
        }
      </div>
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

  protected retry() {
    this.signalService.reload();
  }
} 