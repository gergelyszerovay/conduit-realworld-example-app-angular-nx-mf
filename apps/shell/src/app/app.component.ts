import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthorizationInterceptorService, SharedStore } from '@conduit/shared/core';
import { AuthFeatureGetUserStore } from '@conduit/auth/feature-get-user'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UiFooterComponent, UiNavbarComponent, UiNavbarItemComponent } from '@conduit/shared/ui';
import { LetModule, PushModule } from '@ngrx/component';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'conduit-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    SharedStore,
    AuthFeatureGetUserStore,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptorService, multi: true },
  ],
  imports: [
    UiFooterComponent,
    UiNavbarComponent,
    UiNavbarItemComponent,
    LetModule, PushModule,
    RouterOutlet, NgIf
  ]
})
export class AppComponent implements OnInit {
  constructor(
    protected cdRef: ChangeDetectorRef,
    protected sharedStore: SharedStore,
    protected authFeatureGetUserStore: AuthFeatureGetUserStore
    ) {
    }

  ngOnInit(): void {
    this.authFeatureGetUserStore.getUser();
  }
}
