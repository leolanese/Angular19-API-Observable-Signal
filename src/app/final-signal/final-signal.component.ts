import { Component, inject } from '@angular/core';
import { FinalSignalService } from './final-signal.service';

@Component({
  selector: 'app-final-signal',
  providers: [FinalSignalService],
  standalone: true,
  template: `
    <div class="vehicle-search">
      <input 
        type="text" 
        placeholder="Search posts..." 
        [value]="finalSignalService.searchTerm()" 
        (input)="onSearch($event)" 
      />
      @if (finalSignalService.isLoading()) { 
        <div>Loading posts...</div> 
      } @else if (finalSignalService.error()) { 
        <div style="color: red">{{ finalSignalService.error() }}</div> 
      } @else { 
        <div class="vehicle-grid">
          @for (vehicle of finalSignalService.vehicles(); track vehicle.id) { 
            <div class="vehicle-card">
              <h3>{{ vehicle.title }}</h3>
              <div class="vehicle-details">
                <p><strong>Post ID:</strong> {{ vehicle.id }}</p>
                <p><strong>User ID:</strong> {{ vehicle.userId }}</p>
                <p><strong>Content:</strong> {{ vehicle.body }}</p>
              </div>
            </div>
          }
        </div> 
      }
    </div>
  `,
  styles: [`
    .vehicle-search { padding: 20px; }
    .nav-links { margin-bottom: 20px; }
    .nav-links a { margin-right: 15px; text-decoration: none; color: #666; }
    .nav-links a.active { color: #000; font-weight: bold; }
    input { width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; }
    .vehicle-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .vehicle-card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .vehicle-card h3 { margin: 0 0 10px 0; color: #333; }
    .vehicle-details p { margin: 5px 0; color: #666; }
  `]
})
export class FinalSignalComponent {
  finalSignalService = inject(FinalSignalService);

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.finalSignalService.updateSearch(value);
  }
} 