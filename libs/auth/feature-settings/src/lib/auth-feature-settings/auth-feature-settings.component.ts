import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { filterUndefined, FormErrorPipe, SharedStore, User } from '@conduit/shared/core';
import { LetModule, PushModule } from '@ngrx/component';
import { UiInputComponent, UiButtonComponent } from '@conduit/shared/ui';
import { AuthFeatureSettingsStore } from './auth-feature-settings.store';
import { take } from 'rxjs';
import { fromApiUser } from '@conduit/shared/data-access';

@Component({
  selector: 'conduit-auth-feature-settings',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    PushModule, LetModule,
    UiInputComponent, UiButtonComponent, FormErrorPipe
  ],
  providers: [
    AuthFeatureSettingsStore
  ],
  templateUrl: './auth-feature-settings.component.html',
  styleUrls: ['./auth-feature-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeatureSettingsComponent implements OnInit {
  constructor(
    protected store: AuthFeatureSettingsStore,
    protected sharedStore: SharedStore
  ) {
  }

  ngOnInit(): void {
    this.sharedStore.user$.pipe(
      filterUndefined(),
      take(1)
      ).subscribe((user: User) => {
        this.store.formGroup.patchValue(fromApiUser(user));
    });
  }
}
