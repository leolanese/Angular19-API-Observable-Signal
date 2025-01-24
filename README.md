# Test

```js
src/
└── app/
    │   ├── child/
    │   │       ├── child.component.ts
    │   │       └── child.component.spec.ts
    │   └── parent/
    │           ├── parent.component.ts
    │           └── parent.component.spec.ts
    ├── api.service.ts
    └── http.interceptor.ts
```

```js
ng new test

ng g c child --inline-style --inline-template --standalone
ng g c parent --inline-style --inline-template --standalone
ng g s api
ng g interceptor http

ng serve -o --poll=2000
```

- `SoC`
This example demonstrates the separation of concerns between the `service (responsible for fetching data)`, 
the `smart component (responsible for handling business logic and passing data to the dummy component)`, 
and the `dummy component (responsible for rendering the UI)`. 

- `Function-based Interceptor`: 
It also showcases the usage of an interceptor to log HTTP requests and responses.

- `takeUntilDestroyed(this.destroyRef)` to automatically unsubscribe when the component is destroyed, simplifying the cleanup process even further

- `shareReplay(1)` because multiple components might subscribe to the same observable
