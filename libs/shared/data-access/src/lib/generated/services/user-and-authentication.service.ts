/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { apiLoginUser } from '../models/api-login-user';
import { apiNewUser } from '../models/api-new-user';
import { apiUpdateUser } from '../models/api-update-user';
import { apiUser } from '../models/api-user';

@Injectable({
  providedIn: 'root',
})
export class UserAndAuthenticationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/users/login';

  /**
   * Existing user login.
   *
   * Login for existing user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: {
    context?: HttpContext

    /**
     * Credentials to use
     */
    body: {
'user': apiLoginUser;
}
  }
): Observable<StrictHttpResponse<{
'user': apiUser;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UserAndAuthenticationService.LoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'user': apiUser;
        }>;
      })
    );
  }

  /**
   * Existing user login.
   *
   * Login for existing user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: {
    context?: HttpContext

    /**
     * Credentials to use
     */
    body: {
'user': apiLoginUser;
}
  }
): Observable<{
'user': apiUser;
}> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<{
'user': apiUser;
}>) => r.body as {
'user': apiUser;
})
    );
  }

  /**
   * Path part for operation createUser
   */
  static readonly CreateUserPath = '/users';

  /**
   * Register a new user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params: {
    context?: HttpContext

    /**
     * Details of the new user to register
     */
    body: {
'user': apiNewUser;
}
  }
): Observable<StrictHttpResponse<{
'user': apiUser;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UserAndAuthenticationService.CreateUserPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'user': apiUser;
        }>;
      })
    );
  }

  /**
   * Register a new user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params: {
    context?: HttpContext

    /**
     * Details of the new user to register
     */
    body: {
'user': apiNewUser;
}
  }
): Observable<{
'user': apiUser;
}> {

    return this.createUser$Response(params).pipe(
      map((r: StrictHttpResponse<{
'user': apiUser;
}>) => r.body as {
'user': apiUser;
})
    );
  }

  /**
   * Path part for operation getCurrentUser
   */
  static readonly GetCurrentUserPath = '/user';

  /**
   * Get current user.
   *
   * Gets the currently logged-in user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'user': apiUser;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UserAndAuthenticationService.GetCurrentUserPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'user': apiUser;
        }>;
      })
    );
  }

  /**
   * Get current user.
   *
   * Gets the currently logged-in user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCurrentUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser(params?: {
    context?: HttpContext
  }
): Observable<{
'user': apiUser;
}> {

    return this.getCurrentUser$Response(params).pipe(
      map((r: StrictHttpResponse<{
'user': apiUser;
}>) => r.body as {
'user': apiUser;
})
    );
  }

  /**
   * Path part for operation updateCurrentUser
   */
  static readonly UpdateCurrentUserPath = '/user';

  /**
   * Update current user.
   *
   * Updated user information for current user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCurrentUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCurrentUser$Response(params: {
    context?: HttpContext

    /**
     * User details to update. At least **one** field is required.
     */
    body: {
'user': apiUpdateUser;
}
  }
): Observable<StrictHttpResponse<{
'user': apiUser;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UserAndAuthenticationService.UpdateCurrentUserPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'user': apiUser;
        }>;
      })
    );
  }

  /**
   * Update current user.
   *
   * Updated user information for current user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCurrentUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCurrentUser(params: {
    context?: HttpContext

    /**
     * User details to update. At least **one** field is required.
     */
    body: {
'user': apiUpdateUser;
}
  }
): Observable<{
'user': apiUser;
}> {

    return this.updateCurrentUser$Response(params).pipe(
      map((r: StrictHttpResponse<{
'user': apiUser;
}>) => r.body as {
'user': apiUser;
})
    );
  }

}
