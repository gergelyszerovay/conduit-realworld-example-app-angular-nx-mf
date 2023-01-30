/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * These modules are imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */


import { NgModule } from '@angular/core';

export { HomeFeatureHomeComponent } from '@conduit/home/feature-home';

@NgModule({ })
export class AppModule { }
