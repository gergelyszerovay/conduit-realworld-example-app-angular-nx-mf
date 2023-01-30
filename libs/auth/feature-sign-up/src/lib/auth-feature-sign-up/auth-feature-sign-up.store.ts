import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LocalStorageService, SharedStore } from "@conduit/shared/core";
import { apiNewUser, UserAndAuthenticationService, fromApiUser, HttpRequestState, HttpRequestErrors, defaultHttpRequestErrors, defaultHttpRequestErrorMessage } from "@conduit/shared/data-access";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { LogState } from "ngx-ngrx-component-store-debug-tools";
import { Observable, switchMap, tap } from "rxjs";

interface FormErrors {
  _message?: string,
  username?: string,
  email?: string,
  password?: string
}

interface AuthFeatureSignUpState {
  httpRequestState: HttpRequestState,
  formErrors: FormErrors
}

const initialAuthFeatureSignUpState: AuthFeatureSignUpState = {
  httpRequestState: 'EMPTY',
  formErrors: { }
}

@Injectable()
@LogState({ logLevel: 'debug' })
export class AuthFeatureSignUpStore extends ComponentStore<AuthFeatureSignUpState> {

  public formGroup = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    })
  });

  constructor(
    protected userAndAuthenticationService: UserAndAuthenticationService,
    protected sharedStore: SharedStore,
    protected localStorageService: LocalStorageService,
    protected router: Router
  ) {
    super(initialAuthFeatureSignUpState);
  }

  readonly register = this.effect((user$: Observable<apiNewUser>) => {
    return user$.pipe(
      tap(() => {
        this.setRequestStateLoading();
      }),
      switchMap((user) => this.userAndAuthenticationService.createUser({
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

  setRequestStateLoading = this.updater((state): AuthFeatureSignUpState => {
    return {
      ...state,
      httpRequestState: 'LOADING'
    }
  });

  setRequestStateSuccess = this.updater((state): AuthFeatureSignUpState => {
    return {
      ...state,
      httpRequestState: 'LOADED'
    }
  });

  setRequestStateError = this.updater((state, errorResponse: HttpErrorResponse): AuthFeatureSignUpState => {
    const errors = errorResponse.error?.errors;
    const formErrors: FormErrors = { };
    if (errorResponse.status === 422) {
      formErrors.username = errors?.username && 'Your name ' + errors.username.join(', ');
      formErrors.email = errors?.email && 'Email ' + errors.email.join(', ');
      formErrors.password = errors?.password && 'Password ' + errors.password.join(', ');
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

  setFormErrors = this.updater((state, formErrors: FormErrors): AuthFeatureSignUpState => {
    return {
      ...state,
      formErrors
    }
  });

  public formSubmit(): boolean {
    if (this.formGroup.valid) {
      this.register(this.formGroup.getRawValue());
    }
    else {
      const controls = this.formGroup.controls;
      this.setFormErrors({
        username: controls.email.errors ?
          'Please provide your name' : '',
        email: controls.email.errors ?
          'Please provide a valid email address' : '',
        password: controls.password.errors ?
          'Please provide a password' : ''
      });
    }
    return false;
  }
}
