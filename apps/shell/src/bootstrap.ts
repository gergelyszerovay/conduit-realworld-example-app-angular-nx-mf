import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter, withRouterConfig } from "@angular/router";
import { NgZone, importProvidersFrom, ɵNoopNgZone } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ApiModule } from "@conduit/shared/data-access";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

// Routes with module federation
// import { appRoutes } from './app/app.routes-mf';

// Single application routes
import { appRoutes } from './app/app.routes-monolithic';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withRouterConfig({ paramsInheritanceStrategy: 'always' })),
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    importProvidersFrom(
      HttpClientModule,
      ApiModule.forRoot({ rootUrl: 'https://api.realworld.io/api' })
      ),
    { provide: NgZone, useValue: new ɵNoopNgZone() }
  ]
}).catch((err) => console.error(err));
