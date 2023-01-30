/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * These modules are imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */

export { AuthFeatureSettingsComponent } from '@conduit/auth/feature-settings';
export { AuthFeatureSignInComponent } from '@conduit/auth/feature-sign-in';
export { AuthFeatureSignUpComponent } from '@conduit/auth/feature-sign-up';

import { NgModule } from '@angular/core';

@NgModule({ })
export class AppModule { }
