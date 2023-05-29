# ConduitRealworldExampleAppAngularNxMf

### Microforntends mode

Enable the microforntend routes in `bootstrap.ts`:

```ts
// Routes with module federation
import { appRoutes } from './app/app.routes-mf';

// Single application routes
// import { appRoutes } from './app/app.routes-monolithic';
```

Then run `nx run shell:serve-mf --configuration=development`.

### Monolithic mode

Enable the monolithic routes in `bootstrap.ts`:

```ts
// Routes with module federation
// import { appRoutes } from './app/app.routes-mf';

// Single application routes
import { appRoutes } from './app/app.routes-monolithic';
```

Then run `nx run shell:serve-monolithic --configuration=development`.



