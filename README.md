# Angular (19+) Observable and Signal payload using API requests

## Goals AC's

1.	Get all country names and display on the page: 
https://restcountries.com/v3.1/independent?fields=name

2.	Select a country and Show the flag: 
https://restcountries.com/v3.1/name/Grenada?fields=name,flags

3.	Search countries by language: 
https://restcountries.com/v3.1/lang/spanish?fields=name  

---

## Solution Arquitecture

```js
src/
└── app/
     ├── SoC/
          └── input/output   = Separation of Concern using Parent and Child, @Input()/@Output()
          └── input/output   = Separation of Concern using Parent and Child, input signal/@Output()  
     ├── orphan-observable/  = single Component, managing API request using Observables
     ├── orphan-signal/      = single Component, managing API request using Signals
     ├── orphan-signal-payload-simple/  = single Component, managing API request using Signal
     ├── orphan-signal-payload-nested/  = single Component, managing complex API request using Signal
     |
     ├── app.component.ts
     ├── auth.interceptor.ts
     └── http.interceptor.ts
```

## A few technical mentions
🟡 `SoC`
This example demonstrates the separation of concerns between the: 
`service (responsible for fetching data)`, 
`smart component (responsible for handling business logic and passing data to the dummy component)`, 
`dummy component (responsible for rendering the UI)` 

🟡 `Function-based Interceptor`: 
It also showcases the usage of an interceptor to log HTTP requests and responses.

🟡 RxJS
- `takeUntilDestroyed(this.destroyRef)` to automatically unsubscribe when the component is destroyed, simplifying the cleanup process even further
- `shareReplay(1)` because multiple components might subscribe to the same observable

🟡 Signals and Observables
Signals will hold state values and trigger reactivity in our component, whereas Observables are streams of data that may emit multiple values over time.

🟡 OnPush Change Detection and Reactive Signal 
I Changed detection OnPush: So only change detection is triggered locally to the Signal change (changeDetection: ChangeDetectionStrategy.OnPush)

🟡 TypeScript
- TS Generic Type Parameter <T>
T can replaced with: user, photos, comments, etc. 
The method returns an Observable of type T

