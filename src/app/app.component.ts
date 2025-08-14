import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink
  ],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title">{{ title }}</h1>
      </header>

      <nav class="navigation">
        <div class="nav-section">
          <div class="section-header">
            <h2>🔳 Home</h2>
          </div>
          <div class="nav-links">
            <a routerLink="" class="nav-link home-link">
              <span class="link-icon">🏠</span>
              <span class="link-text">Home Dashboard</span>
            </a>
            <div class="path-info">/</div>
          </div>
        </div>

        <div class="nav-section">
          <div class="section-header">
            <h2>🔴 Observable-based</h2>
            <p class="section-description">Traditional RxJS Observable patterns</p>
          </div>
          <div class="nav-links">
            <a routerLink="/SoC/input-output" class="nav-link">
              <span class="link-icon">🔴</span>
              <span class="link-text">SoC Parent ↔ Child API Observable API Nested</span>
            </a>
            <div class="path-info">/SoC/input-output</div>
            <a routerLink="/orphan-observable" class="nav-link">
              <span class="link-icon">🔴</span>
              <span class="link-text">Orphan Observable</span>
            </a>
            <div class="path-info">/orphan-observable</div>
          </div>
        </div>

        <div class="nav-section">
          <div class="section-header">
            <h2>🟠 Hybrid Observable-Signal</h2>
            <p class="section-description">Mixed patterns combining Observables and Signals</p>
          </div>
          <div class="nav-links">
            <a routerLink="/SoC/input-signal" class="nav-link">
              <span class="link-icon">🟠</span>
              <span class="link-text">SoC Parent ↔ Child, input-signal, API Observable API Nested</span>
            </a>
            <div class="path-info">/SoC/input-signal</div>
            <a routerLink="/orphan-signal" class="nav-link">
              <span class="link-icon">🟠</span>
              <span class="link-text">Orphan Signal</span>
            </a>
            <div class="path-info">/orphan-signal</div>
            <a routerLink="/orphan-signal-simple" class="nav-link">
              <span class="link-icon">🟠</span>
              <span class="link-text">Orphan Signal API Simple</span>
            </a>
            <div class="path-info">/orphan-signal-simple</div>
            <a routerLink="/orphan-signal-nested" class="nav-link">
              <span class="link-icon">🟠</span>
              <span class="link-text">Orphan Signal API Nested</span>
            </a>
            <div class="path-info">/orphan-signal-nested</div>
          </div>
        </div>

        <div class="nav-section">
          <div class="section-header">
            <h2>🟡 HttpResource Patterns</h2>
            <p class="section-description">Modern HttpResource with Signals</p>
          </div>
          <div class="nav-links">
            <a routerLink="/orphan-signal-httpresource" class="nav-link">
              <span class="link-icon">🟡</span>
              <span class="link-text">Orphan Signal Simple API request using HttpResource</span>
            </a>
            <div class="path-info">/orphan-signal-httpresource</div>
            <a routerLink="/orphan-signal-httpresource-reactiveForm" class="nav-link">
              <span class="link-icon">🟡</span>
              <span class="link-text">Orphan Signal API Simple HttpResource + Reactive form</span>
            </a>
            <div class="path-info">/orphan-signal-httpresource-reactiveForm</div>
            <a routerLink="/orphan-signal-httpresource-signal" class="nav-link">
              <span class="link-icon">🟡</span>
              <span class="link-text">Orphan Signal API Simple HttpResource</span>
            </a>
            <div class="path-info">/orphan-signal-httpresource-signal</div>
          </div>
        </div>

        <div class="nav-section">
          <div class="section-header">
            <h2>🟢 Fully Signal-based</h2>
            <p class="section-description">Pure Signal patterns with modern Angular features</p>
          </div>
          <div class="nav-links">
            <a routerLink="/orphan-signal-input-pattern" class="nav-link">
              <span class="link-icon">🟢</span>
              <span class="link-text">Orphan fully Signal-based using signal-input-pattern (1-way binding)</span>
            </a>
            <div class="path-info">/orphan-signal-input-pattern</div>
            <a routerLink="/orphan-signal-input-pattern-nested" class="nav-link">
              <span class="link-icon">🟢</span>
              <span class="link-text">Orphan fully Signal-based using signal-input-pattern (Nested)</span>
            </a>
            <div class="path-info">/orphan-signal-input-pattern-nested</div>
            <a routerLink="/orphan-signal-model" class="nav-link">
              <span class="link-icon">🟢</span>
              <span class="link-text">Orphan fully Signal-based using model() (2-way binding)</span>
            </a>
            <div class="path-info">/orphan-signal-model</div>
          </div>
        </div>

        <div class="nav-section">
          <div class="section-header">
            <h2>🚀 Final Implementation</h2>
            <p class="section-description">Complete Signal-based solution with HttpResource</p>
          </div>
          <div class="nav-links">
            <a routerLink="/final-signal" class="nav-link featured-link">
              <span class="link-icon">🚀</span>
              <span class="link-text">Final Signal-based API request and search</span>
            </a>
            <div class="path-info">/final-signal</div>
          </div>
        </div>
      </nav>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .app-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .app-title {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .navigation {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .nav-section {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .nav-section:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .nav-section.featured {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98));
      border: 2px solid #10b981;
    }

    .section-header {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f3f4f6;
    }

    .section-header h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
    }

    .section-description {
      margin: 0;
      color: #6b7280;
      font-size: 0.875rem;
      font-style: italic;
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      text-decoration: none;
      color: #374151;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .nav-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.5s;
    }

    .nav-link:hover::before {
      left: 100%;
    }

    .nav-link:hover {
      background: #f3f4f6;
      border-color: #d1d5db;
      transform: translateX(4px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .nav-link.featured-link {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border-color: #10b981;
      font-weight: 600;
    }

    .nav-link.featured-link:hover {
      background: linear-gradient(135deg, #059669, #047857);
      transform: translateX(4px) scale(1.02);
    }

    .link-icon {
      font-size: 1.25rem;
      min-width: 1.5rem;
      text-align: center;
    }

    .link-text {
      flex: 1;
      line-height: 1.4;
    }

    .path-info {
      font-size: 0.75rem;
      color: #9ca3af;
      margin-bottom: 0.25rem;
      font-style: italic;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
      background: #f3f4f6;
      border-radius: 4px;
      border-left: 3px solid #d1d5db;
    }

    .main-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .navigation {
        grid-template-columns: 1fr;
        padding: 1rem;
      }

      .app-title {
        font-size: 2rem;
      }

      .nav-section {
        padding: 1rem;
      }

      .nav-link {
        padding: 0.75rem;
        font-size: 0.8rem;
      }
    }

    @media (max-width: 480px) {
      .app-header {
        padding: 1rem;
      }

      .app-title {
        font-size: 1.75rem;
      }

      .navigation {
        padding: 0.5rem;
      }

      .nav-section {
        padding: 0.75rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'Angular State Management Evolution: From Observables to Signals';
}
