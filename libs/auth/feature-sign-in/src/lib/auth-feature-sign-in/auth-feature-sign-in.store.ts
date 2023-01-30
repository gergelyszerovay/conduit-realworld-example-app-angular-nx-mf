import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedStore, LocalStorageService } from "@conduit/shared/core";
import { apiLoginUser, defaultHttpRequestErrorMessage, fromApiUser, HttpRequestState, UserAndAuthenticationService } from "@conduit/shared/data-access";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { LogState } from "ngx-ngrx-component-store-debug-tools";
import { Observable, switchMap, tap } from "rxjs";

interface FormErrors {
  _message?: string,
  email?: string,
  password?: string
}

interface AuthFeatureSignInState {
  httpRequestState: HttpRequestState,
  formErrors: FormErrors
}

const initialAuthFeatureSignInState: AuthFeatureSignInState = {
  httpRequestState: 'EMPTY',
  formErrors: { }
}

@Injectable()
@LogState({ logLevel: 'debug' })
export class AuthFeatureSignInStore extends ComponentStore<AuthFeatureSignInState> {
  public formGroup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    protected userAndAuthenticationService: UserAndAuthenticationService,
    protected sharedStore: SharedStore,
    protected localStorageService: LocalStorageService,
    protected router: Router
  ) {
    super(initialAuthFeatureSignInState);
  }

  readonly login = this.effect((user$: Observable<apiLoginUser>) => {
    return user$.pipe(
      tap(() => {
        this.setRequestStateLoading();
      }),
      switchMap((user) => this.userAndAuthenticationService.login({
        body: { user }
      }).pipe(
        tapResponse(
          (response) => {
            this.sharedStore.setUser(fromApiUser(response.user));
            this.localStorageService.set(response.user.token)
            this.setRequestStateSuccess();
            this.router.navigateByUrl('/');
          },
          (errorResponse: HttpErrorResponse) => {
            this.sharedStore.setUser(undefined);
            this.localStorageService.remove();
            this.setRequestStateError(errorResponse);
          }
        ),
      )),
    );
  });

  setRequestStateLoading = this.updater((state): AuthFeatureSignInState => {
    return {
      ...state,
      httpRequestState: 'LOADING'
    }
  });

  setRequestStateSuccess = this.updater((state): AuthFeatureSignInState => {
    return {
      ...state,
      httpRequestState: 'LOADED'
    }
  });

  setRequestStateError = this.updater((state, errorResponse: HttpErrorResponse): AuthFeatureSignInState => {
    const errors = errorResponse.error?.errors;
    const formErrors: FormErrors = { };
    if (errorResponse.status === 422) {
      formErrors.email = errors?.email && 'Email ' + errors.email.join(', ');
      formErrors.password = errors?.password && 'Password ' + errors.password.join(', ');
    }
    if (errorResponse.status === 403) {
      formErrors._message = 'You have entered an invalid email or password';
    }
    if (!Object.values(formErrors).some(e => !!e)) {
      formErrors._message = defaultHttpRequestErrorMessage;
    }

    return {
      ...state,
      httpRequestState: { errors },
      formErrors
    }
  });

  setFormErrors = this.updater((state, formErrors: FormErrors): AuthFeatureSignInState => {
    return {
      ...state,
      formErrors
    }
  });

  public formSubmit(): boolean {
    if (this.formGroup.valid) {
      this.login(this.formGroup.getRawValue());
    }
    else {
      const controls = this.formGroup.controls;
      this.setFormErrors({
        email:
          controls.email.errors ? 'Please provide a valid email address' : '',
        password:
          (controls.password.errors && controls.password.errors['required']) ?
          'Please provide a password' : ''
      });
    }
    return false;
  }
}
