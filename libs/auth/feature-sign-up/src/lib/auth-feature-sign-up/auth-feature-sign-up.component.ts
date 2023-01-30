import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LetModule, PushModule } from '@ngrx/component';
import { UiInputComponent, UiButtonComponent } from '@conduit/shared/ui';
import { AuthFeatureSignUpStore } from './auth-feature-sign-up.store';
import { HttpRequestStateErrorPipe } from '@conduit/shared/data-access';
import { FormErrorPipe } from '@conduit/shared/core';

@Component({
  selector: 'conduit-auth-feature-sign-up',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    PushModule, LetModule,
    UiInputComponent, UiButtonComponent, FormErrorPipe,
    HttpRequestStateErrorPipe
  ],
  providers: [
    AuthFeatureSignUpStore
  ],
  templateUrl: './auth-feature-sign-up.component.html',
  styleUrls: ['./auth-feature-sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeatureSignUpComponent {

  constructor(
    protected store: AuthFeatureSignUpStore
  ) {
  }
}
