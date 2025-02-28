# Test

## AC's

1.	Get all country names and display on the page: 
https://restcountries.com/v3.1/independent?fields=name

2.	Select a country and Show the flag: 
https://restcountries.com/v3.1/name/Grenada?fields=name,flags

3.	Search countries by language: 
https://restcountries.com/v3.1/lang/spanish?fields=name  


! - These tasks are nested tasks, and depends on each other payload, that a trick.

---

## Solution Arquitecture

```js
src/
└── app/
     ├── SoC/ @Input()/@Output()
     
     ├── orphan-observable/
     ├── orphan-signal/
     ├── orphan-signal-payload-simple/
     ├── orphan-signal-payload-nested/
     |
     ├── app.component.ts
     ├── auth.interceptor.ts
     └── http.interceptor.ts
```

```js
ng new test

ng g c child --inline-style --inline-template --standalone
ng g c parent --inline-style --inline-template --standalone
ng g s api

// optional
ng g interceptor http

ng serve -o --poll=2000
```

- `SoC`
This example demonstrates the separation of concerns between the: 
`service (responsible for fetching data)`, 
`smart component (responsible for handling business logic and passing data to the dummy component)`, 
`dummy component (responsible for rendering the UI)` 

- `Function-based Interceptor`: 
It also showcases the usage of an interceptor to log HTTP requests and responses.

- `takeUntilDestroyed(this.destroyRef)` to automatically unsubscribe when the component is destroyed, simplifying the cleanup process even further

- `shareReplay(1)` because multiple components might subscribe to the same observable

- TS Generic Type Parameter <T>
T can replaced with: user, photos, comments, etc. 
The method returns an Observable of type T

