import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SharedStore, LocalStorageService } from "@conduit/shared/core";
import { fromApiUser, HttpRequestErrors, HttpRequestState, UserAndAuthenticationService } from "@conduit/shared/data-access";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { LogState } from "ngx-ngrx-component-store-debug-tools";
import { Observable, switchMap, tap } from "rxjs";
import { filter } from "rxjs/operators";

interface AuthFeatureGetUserState {
  httpRequestState: HttpRequestState;
}

const initialAuthFeatureGetUserState: AuthFeatureGetUserState = {
  httpRequestState: 'EMPTY'
}

@Injectable()
@LogState({ logLevel: 'debug' })
export class AuthFeatureGetUserStore extends ComponentStore<AuthFeatureGetUserState> {

  constructor(
    protected userAndAuthenticationService: UserAndAuthenticationService,
    protected sharedStore: SharedStore,
    protected localStorageService: LocalStorageService,
    protected router: Router
  ) {
    super(initialAuthFeatureGetUserState);
  }

  readonly getUser = this.effect((trigger$: Observable<undefined>) => {
    return trigger$.pipe(
      filter(() => !!this.localStorageService.get()),
      tap(() => {
        this.setRequestStateLoading();
      }),
      switchMap(() => this.userAndAuthenticationService.getCurrentUser().pipe(
        tapResponse(
          (response) => {
            this.sharedStore.setUser(fromApiUser(response.user));
            this.localStorageService.set(response.user.token)
            this.setRequestStateSuccess();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.sharedStore.setUser(undefined);
            if (this.localStorageService.get()) {
              this.localStorageService.remove();
              this.router.navigateByUrl('/');
            }
            // TODO: error handler function
            // if (error.status === 403) {
            //   this.setRequestStateError('You have entered an invalid email or password');
            //   return;
            // }
            // this.setRequestStateError('Cannot connect to the server');
          }
        ),
      )),
    );
  });

  setRequestStateLoading = this.updater((state): AuthFeatureGetUserState => {
    return {
      ...state,
      httpRequestState: 'LOADING'
    }
  });

  setRequestStateSuccess = this.updater((state): AuthFeatureGetUserState => {
    return {
      ...state,
      httpRequestState: 'LOADED'
    }
  });

  setRequestStateError = this.updater((state, errors: HttpRequestErrors): AuthFeatureGetUserState => {
    return {
      ...state,
      httpRequestState: { errors }
    }
  });
}
