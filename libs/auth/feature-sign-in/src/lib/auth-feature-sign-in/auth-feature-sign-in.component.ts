import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiButtonComponent, UiInputComponent } from '@conduit/shared/ui'
import { LetModule, PushModule } from '@ngrx/component';
import { AuthFeatureSignInStore } from './auth-feature-sign-in.store';
import { HttpRequestStateErrorPipe } from '@conduit/shared/data-access';
import { FormErrorPipe } from '@conduit/shared/core';

@Component({
  selector: 'conduit-auth-feature-sign-in',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    PushModule, LetModule,
    UiInputComponent, UiButtonComponent, FormErrorPipe,
    HttpRequestStateErrorPipe
  ],
  providers: [
    AuthFeatureSignInStore
  ],
  templateUrl: './auth-feature-sign-in.component.html',
  styleUrls: ['./auth-feature-sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeatureSignInComponent {
  constructor(
    protected store: AuthFeatureSignInStore
  ) {
  }

}
