import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// Routes with module federation
import { appRoutes } from './app.routes-mf';

// Single application routes
// import { appRoutes } from './app.routes';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptorService, SharedStore } from '@conduit/shared/core';
import { ApiModule } from '@conduit/shared/data-access';
import { UiFooterComponent, UiNavbarComponent, UiNavbarItemComponent } from '@conduit/shared/ui';
import { LetModule, PushModule } from '@ngrx/component';
import { AuthFeatureGetUserStore } from '@conduit/auth/feature-get-user';

@NgModule({
  declarations: [AppComponent],
  imports: [
    UiFooterComponent,
    UiNavbarComponent,
    UiNavbarItemComponent,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    LetModule, PushModule,
    ApiModule.forRoot({ rootUrl: 'https://api.realworld.io/api' })
  ],
  bootstrap: [AppComponent],
  providers: [
    SharedStore,
    AuthFeatureGetUserStore,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptorService, multi: true },
  ]
})
export class AppModule {}
