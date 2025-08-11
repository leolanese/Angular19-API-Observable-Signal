import { httpResource } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root' // Singleton service
})
export class SignalService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com' as const;

  // Private state signals
  readonly searchTerm = signal<string>('');

  // HttpResource with proper typing
  private readonly postsResource = httpResource<Post[]>(
    () => ({
      url: `${this.baseUrl}/posts${this.searchTerm() ? `?q=${this.searchTerm()}` : ''}`,
      method: 'GET' as const
    }),
    { defaultValue: [] }
  );

  // ✅ Computed signals for derived state
  readonly isLoading = this.postsResource.isLoading;
  readonly error = computed(() => {
    const err = this.postsResource.error();
    return err ? 'Failed to fetch items' : null;
  });
  readonly posts = computed(() => this.postsResource.value() || []);

  // Method to update search term
  updateSearch(term: string): void {
    this.searchTerm.set(term);
    this.postsResource.reload();
  }
} 