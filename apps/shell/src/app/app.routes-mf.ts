import { Route } from '@angular/router';
import { AuthGuardService } from '@conduit/shared/core';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('mf-user/AuthFeatureSignInComponent').then((m) => m.AuthFeatureSignInComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('mf-user/AuthFeatureSignUpComponent').then((m) => m.AuthFeatureSignUpComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('mf-user/AuthFeatureSettingsComponent').then((m) => m.AuthFeatureSettingsComponent),
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    loadComponent: () =>
      import('mf-article/HomeFeatureHomeComponent').then((m) => m.HomeFeatureHomeComponent),
  },
];
