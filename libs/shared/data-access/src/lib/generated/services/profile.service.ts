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

import { apiProfile } from '../models/api-profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getProfileByUsername
   */
  static readonly GetProfileByUsernamePath = '/profiles/{username}';

  /**
   * Get a profile.
   *
   * Get a profile of a user of the system. Auth is optional
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProfileByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfileByUsername$Response(params: {

    /**
     * Username of the profile to get
     */
    username: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'profile': apiProfile;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileService.GetProfileByUsernamePath, 'get');
    if (params) {
      rb.path('username', params.username, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'profile': apiProfile;
        }>;
      })
    );
  }

  /**
   * Get a profile.
   *
   * Get a profile of a user of the system. Auth is optional
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProfileByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfileByUsername(params: {

    /**
     * Username of the profile to get
     */
    username: string;
    context?: HttpContext
  }
): Observable<{
'profile': apiProfile;
}> {

    return this.getProfileByUsername$Response(params).pipe(
      map((r: StrictHttpResponse<{
'profile': apiProfile;
}>) => r.body as {
'profile': apiProfile;
})
    );
  }

  /**
   * Path part for operation followUserByUsername
   */
  static readonly FollowUserByUsernamePath = '/profiles/{username}/follow';

  /**
   * Follow a user.
   *
   * Follow a user by username
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `followUserByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  followUserByUsername$Response(params: {

    /**
     * Username of the profile you want to follow
     */
    username: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'profile': apiProfile;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileService.FollowUserByUsernamePath, 'post');
    if (params) {
      rb.path('username', params.username, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'profile': apiProfile;
        }>;
      })
    );
  }

  /**
   * Follow a user.
   *
   * Follow a user by username
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `followUserByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  followUserByUsername(params: {

    /**
     * Username of the profile you want to follow
     */
    username: string;
    context?: HttpContext
  }
): Observable<{
'profile': apiProfile;
}> {

    return this.followUserByUsername$Response(params).pipe(
      map((r: StrictHttpResponse<{
'profile': apiProfile;
}>) => r.body as {
'profile': apiProfile;
})
    );
  }

  /**
   * Path part for operation unfollowUserByUsername
   */
  static readonly UnfollowUserByUsernamePath = '/profiles/{username}/follow';

  /**
   * Unfollow a user.
   *
   * Unfollow a user by username
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unfollowUserByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  unfollowUserByUsername$Response(params: {

    /**
     * Username of the profile you want to unfollow
     */
    username: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'profile': apiProfile;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ProfileService.UnfollowUserByUsernamePath, 'delete');
    if (params) {
      rb.path('username', params.username, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'profile': apiProfile;
        }>;
      })
    );
  }

  /**
   * Unfollow a user.
   *
   * Unfollow a user by username
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unfollowUserByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unfollowUserByUsername(params: {

    /**
     * Username of the profile you want to unfollow
     */
    username: string;
    context?: HttpContext
  }
): Observable<{
'profile': apiProfile;
}> {

    return this.unfollowUserByUsername$Response(params).pipe(
      map((r: StrictHttpResponse<{
'profile': apiProfile;
}>) => r.body as {
'profile': apiProfile;
})
    );
  }

}
