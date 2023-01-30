import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LocalStorageService, SharedStore } from "@conduit/shared/core";
import { apiUpdateUser, defaultHttpRequestErrorMessage, fromApiUser, HttpRequestState, UserAndAuthenticationService } from "@conduit/shared/data-access";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { LogState } from "ngx-ngrx-component-store-debug-tools";
import { Observable, switchMap, tap } from "rxjs";

interface FormErrors {
  _message?: string,
  username?: string,
  email?: string,
  password?: string
}

interface AuthFeatureSettingsState {
  httpRequestState: HttpRequestState,
  formErrors: FormErrors
}

const initialAuthFeatureSettingsState: AuthFeatureSettingsState = {
  httpRequestState: 'EMPTY',
  formErrors: { }
}

@Injectable()
@LogState({ logLevel: 'debug' })
export class AuthFeatureSettingsStore extends ComponentStore<AuthFeatureSettingsState> {
  public formGroup = new FormGroup({
    image: new FormControl('', {
      nonNullable: true,
      validators: [],
    }),
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    bio: new FormControl('', {
      nonNullable: true,
      validators: [],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
  });

  constructor(
    protected userAndAuthenticationService: UserAndAuthenticationService,
    protected sharedStore: SharedStore,
    protected localStorageService: LocalStorageService,
    protected router: Router
  ) {
    super(initialAuthFeatureSettingsState);
  }

  private readonly updateSettings = this.effect((user$: Observable<apiUpdateUser>) => {
    return user$.pipe(
      tap(() => {
        this.setRequestStateLoading();
      }),
      switchMap((user) => this.userAndAuthenticationService.updateCurrentUser({
        body: { user }
      }).pipe(
        tapResponse(
          (response) => {
            this.sharedStore.setUser(fromApiUser(response.user));
            this.setRequestStateSuccess();
          },
          (errorResponse: HttpErrorResponse) => {
            this.setRequestStateError(errorResponse);
          }
        )
      ))
    );
  });

  setRequestStateLoading = this.updater((state): AuthFeatureSettingsState => {
    return {
      ...state,
      httpRequestState: 'LOADING'
    }
  });

  setRequestStateSuccess = this.updater((state): AuthFeatureSettingsState => {
    return {
      ...state,
      httpRequestState: 'LOADED'
    }
  });

  setRequestStateError = this.updater((state, errorResponse: HttpErrorResponse): AuthFeatureSettingsState => {
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

  setFormErrors = this.updater((state, formErrors: FormErrors): AuthFeatureSettingsState => {
    return {
      ...state,
      formErrors
    }
  });

  public formSubmit(): boolean {
    if (this.formGroup.valid) {
      this.updateSettings(this.formGroup.getRawValue());
    }
    else {
      const controls = this.formGroup.controls;
      this.setFormErrors({
        username: controls.email.errors ?
          'Please provide your name' : '',
        email: controls.email.errors ?
          'Please provide a valid email address' : ''
      });
    }
    return false;
  }

  public logout(): void {
    this.sharedStore.setUser(undefined);
    this.localStorageService.remove();
    this.router.navigateByUrl('/');
  }
}
