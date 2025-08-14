# Angular (20+) Observable + Signals for handling API requests 

🔴
🟡
🟢
🚀

## ⏺ Goals AC's

### ⏺ Test legacy Angular Vs new modern Angular practices

Test API based on Observable, Signal (state management, effect, httpResource, input-pattern, model)


https://jsonplaceholder.typicode.com/posts <br />

### ⏺ Test complex/nested API Requests

1. Get all country names and display on the page:
   https://restcountries.com/v3.1/independent?fields=name

2. Select a country and Show the flag:
   https://restcountries.com/v3.1/name/Grenada?fields=name,flags

3. Search countries by language:
   https://restcountries.com/v3.1/lang/spanish?fields=name

---

## 🔸 Demo

```js
Angular CLI: 20.1.5
Node: 22.13.1
Package Manager: npm 11.0.0
OS: darwin arm64

Angular: 20.1.6
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.2001.5
@angular-devkit/build-angular   20.1.5
@angular-devkit/core            20.1.5
@angular-devkit/schematics      20.1.5
@angular/cli                    20.1.5
@schematics/angular             20.1.5
rxjs                            7.8.2
typescript                      5.8.3
zone.js                         0.15.0
```

---

## Modern practices latest final signal-based API is implementing 🚀

```js
✅ @NgModule  → Standalone component
✅ *ngFor, *ngIf  → Modern control flow: @if, @for
✅ HttpClient → HttpResource API for data fetching
✅ ngOnInit() + subscribe() + contructor based inject → Use reactive Signals + computed() 
✅ contruct-based DI injection → inject(HttpClient) 
✅ Better Ts notation → Protected + readonly template properties for protection and mutability control

✅ RxJS / reactive streams → `Signal-Based Component Architecture Pattern` (using signals, computed, and effects internally instead of Observables for local reactive state)
✅ Flow / Two-Way Binding (Old Way) → `Signal-input-pattern architecture flow` (signal parent ↔ child communication)
```

---

## 🔸 Example Solution Arquitecture

```js
src/
└── app/
     ├── SoC/
          └── input/output   // Separation of Concern using Parent and Child, @Input()/@Output()
          └── input/output   // Separation of Concern using Parent and Child, input signal/@Output()
     ├── orphan-observable/  // single Component, managing API request using Observables
     ├── orphan-signal/      // single Component, managing API request using Signals
     ├── orphan-signal-simple/  // single Component, managing API request using Signal
     ├── orphan-signal-nested/  // single Component, managing complex API request using Signal
     ├── orphan-signal-httpresource/ // simple Component, managing API request using Signals with httpResouce asynchronous data fetching
     ├── orphan-signal--httpresource-reactiveForm/ // Shows how the new signals approach replaces the traditional RxJS pattern
     ├── orphan-signal-httpresource-signal/ // 100% fully signal-based. Using direct signal binding with [value] and (input). Simple event handler to update the signal
     ├── orphan-signal-input-pattern/ // full signal-based approach: 1-way binding
     ├── orphan-signal-model/ // full signal-based approach: 2-way binding
     |
     ├── app.component.ts
     ├── auth.interceptor.ts
     └── http.interceptor.ts
```

## 🔸 Technical mentions

🟡 Green solutions are 100% fully reactive signal-based which are Angular recommendations:

🔵 Reactive state management

- `All state is managed through signals in the service`

🔵 Data Management:

- `No local component state variables` that aren't signals
- `No RxJS Observables or Subjects`

🔵 HTTP Handling:

- `Signal with httpresource`, for automatic data fetching

🔵 Template Binding:

- Replaces `NgModel` is part of the older Forms API, while signals represent Angular's future
- `All template expressions use signals` (vehicleService.searchTerm(), vehicleService.isLoading(), etc.)
- Uses `modern Angular control flow` (@if, @else, @for)

🔵 Data Flow:

### `Unidirectional Data Flow`: clean, predictable, and performant! 🚀

- Use `signal-input-pattern`: `[value] + (input) pattern`:
  `It's simply a combination of 1-way binding (Property [value]="searchSignal()" + event binding (input)="signal.set()")`
-- The Two Parts of `Signal-Input-Pattern`: 
```js
<!-- Template - Signal-Input-Pattern -->
<input 
  [value]="signalService.searchTerm()"  <!-- Signal → View -->
  (input)="onSearch($event)"            <!-- View → Signal -->
/>
```
```js
    Signal → View ([property] binding) = [value]="searchSignal()
    View   → Signal (event() handler) = (input)="signal.set()"
```


- `Direct Signal Control` (when is read = binding, when is updated = event handler)

### `Bidirectional Data Flow` (model() implement 2-way binding simplify two-way binding boilerplate

🔵 Event Handling:

- Input events directly update signals (this.vehicleService.searchTerm.set(value))
- No intermediate transformations using RxJS operators

🔵 Service Implementation:

- Uses httpResource for HTTP requests (instead HttpClient)
  This provides:
- Automatically fetches data when the component initializes.
- Handles loading, success, and error states without extra code.
- Provides a .value() method to access the latest data.
- Supports reloading with .reload().
- Stays within the signals paradigm and use signals' effect() to automatically handle cleanup (instead OnInit/OnDestroy + No need for manual subscription management)

🟡 Other technical mentions

🔵 `SoC`
This example demonstrates the separation of concerns between the:
`service (responsible for fetching data)`,
`smart component (responsible for handling business logic and passing data to the dummy component)`, `dummy component (responsible for rendering the UI)`

🔵 `Modern StandAlone Components`:
I directly bootstrap the component itself, not its module. This is because standalone components have their own injectors and don't rely on a root module for dependency injection. Promotes code maintainability, reusability, and smaller application size.

🔵 Implemented `TSP mechanism`:
I'm using `Tree Shakeable Providers` in `Services` by using the `providedIn` attribute, this will provide the benefits of both `tree shaking performance` and `dependency injection`,
meaning that our services will not be included in the final bundle unless they are being used by other services or components. As a result we reduce the bundle size by removing unused code from the bundle.

🔵 `RxJS`

- `takeUntilDestroyed(this.destroyRef)` to automatically unsubscribe when the component is destroyed, simplifying the cleanup process even further
- `shareReplay(1)` because multiple components might subscribe to the same observable

🔵 `Dependency Injection Pattern`:
I'm using Modern `Dependency Injection functions`, instead traditional `constructor-based dependency injection`as result I will have a more Modular, Less Complex

🔵 Implement Caching:
-- `Cache API Service Calls`
Caches identical HTTP requests within a single component:
I'm using `shareReplay()` to improve efficiency, ensuring that all subscribers receive the most recent data without triggering multiple HTTP requests.

🔵 `DestroyRef & takeUntilDestroyed()`: Angular 16+
I'm using provides a more declarative and efficient way to handle automatic cleanup tasks when a component or service is destroyed: `takeUntilDestroyed(this.destroyRef)` to automatically unsubscribe when the component is destroyed, simplifying the cleanup process even further

🔵 `Function-based Interceptor` (optional):
It also showcases the usage of an interceptor to log HTTP requests and responses. While not necessary for this example, it can be useful for debugging and monitoring purposes (WIP)

---

### :100: <i>Thanks!</i>

#### Now, don't be an stranger. Let's stay in touch ‼

<a href="https://github.com/leolanese" target="_blank" rel="noopener noreferrer">
  <img src="https://scastiel.dev/api/image/leolanese?dark&removeLink" alt="leolanese’s GitHub image" width="600" height="314" />
</a>

##### :radio_button: gitroll: <a href="https://gitroll.io/profile/uCOZ9SM8b7ne9h17NuPuKVky9uFh2" target="_blank">LeoLanese</a>

##### :radio_button: Linkedin: <a href="https://www.linkedin.com/in/leolanese/" target="_blank">LeoLanese</a>

##### :radio_button: Twitter: <a href="https://twitter.com/LeoLanese" target="_blank">@LeoLanese</a>

##### :radio_button: Blog: <a href="https://www.dev.to/leolanese" target="_blank">dev.to/leolanese</a>

##### :radio_button: Questions / Suggestions / Recommendations: <a href="mailto:developer@leolanese.com">developer@leolanese.com</a>
