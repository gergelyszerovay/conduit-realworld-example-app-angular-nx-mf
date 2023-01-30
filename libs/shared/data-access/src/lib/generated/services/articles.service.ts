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

import { apiArticle } from '../models/api-article';
import { apiNewArticle } from '../models/api-new-article';
import { apiUpdateArticle } from '../models/api-update-article';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getArticlesFeed
   */
  static readonly GetArticlesFeedPath = '/articles/feed';

  /**
   * Get recent articles from users you follow.
   *
   * Get most recent articles from users you follow. Use query parameters to limit. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticlesFeed()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticlesFeed$Response(params?: {

    /**
     * The number of items to skip before starting to collect the result set.
     */
    offset?: number;

    /**
     * The numbers of items to return.
     */
    limit?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'articles': Array<apiArticle>;
'articlesCount': number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetArticlesFeedPath, 'get');
    if (params) {
      rb.query('offset', params.offset, {});
      rb.query('limit', params.limit, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'articles': Array<apiArticle>;
        'articlesCount': number;
        }>;
      })
    );
  }

  /**
   * Get recent articles from users you follow.
   *
   * Get most recent articles from users you follow. Use query parameters to limit. Auth is required
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticlesFeed$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticlesFeed(params?: {

    /**
     * The number of items to skip before starting to collect the result set.
     */
    offset?: number;

    /**
     * The numbers of items to return.
     */
    limit?: number;
    context?: HttpContext
  }
): Observable<{
'articles': Array<apiArticle>;
'articlesCount': number;
}> {

    return this.getArticlesFeed$Response(params).pipe(
      map((r: StrictHttpResponse<{
'articles': Array<apiArticle>;
'articlesCount': number;
}>) => r.body as {
'articles': Array<apiArticle>;
'articlesCount': number;
})
    );
  }

  /**
   * Path part for operation getArticles
   */
  static readonly GetArticlesPath = '/articles';

  /**
   * Get recent articles globally.
   *
   * Get most recent articles globally. Use query parameters to filter results. Auth is optional
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticles$Response(params?: {

    /**
     * Filter by tag
     */
    tag?: string;

    /**
     * Filter by author (username)
     */
    author?: string;

    /**
     * Filter by favorites of a user (username)
     */
    favorited?: string;

    /**
     * The number of items to skip before starting to collect the result set.
     */
    offset?: number;

    /**
     * The numbers of items to return.
     */
    limit?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'articles': Array<apiArticle>;
'articlesCount': number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetArticlesPath, 'get');
    if (params) {
      rb.query('tag', params.tag, {});
      rb.query('author', params.author, {});
      rb.query('favorited', params.favorited, {});
      rb.query('offset', params.offset, {});
      rb.query('limit', params.limit, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'articles': Array<apiArticle>;
        'articlesCount': number;
        }>;
      })
    );
  }

  /**
   * Get recent articles globally.
   *
   * Get most recent articles globally. Use query parameters to filter results. Auth is optional
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticles(params?: {

    /**
     * Filter by tag
     */
    tag?: string;

    /**
     * Filter by author (username)
     */
    author?: string;

    /**
     * Filter by favorites of a user (username)
     */
    favorited?: string;

    /**
     * The number of items to skip before starting to collect the result set.
     */
    offset?: number;

    /**
     * The numbers of items to return.
     */
    limit?: number;
    context?: HttpContext
  }
): Observable<{
'articles': Array<apiArticle>;
'articlesCount': number;
}> {

    return this.getArticles$Response(params).pipe(
      map((r: StrictHttpResponse<{
'articles': Array<apiArticle>;
'articlesCount': number;
}>) => r.body as {
'articles': Array<apiArticle>;
'articlesCount': number;
})
    );
  }

  /**
   * Path part for operation createArticle
   */
  static readonly CreateArticlePath = '/articles';

  /**
   * Create an article.
   *
   * Create an article. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createArticle$Response(params: {
    context?: HttpContext

    /**
     * Article to create
     */
    body: {
'article': apiNewArticle;
}
  }
): Observable<StrictHttpResponse<{
'article': apiArticle;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.CreateArticlePath, 'post');
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
        'article': apiArticle;
        }>;
      })
    );
  }

  /**
   * Create an article.
   *
   * Create an article. Auth is required
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createArticle(params: {
    context?: HttpContext

    /**
     * Article to create
     */
    body: {
'article': apiNewArticle;
}
  }
): Observable<{
'article': apiArticle;
}> {

    return this.createArticle$Response(params).pipe(
      map((r: StrictHttpResponse<{
'article': apiArticle;
}>) => r.body as {
'article': apiArticle;
})
    );
  }

  /**
   * Path part for operation getArticle
   */
  static readonly GetArticlePath = '/articles/{slug}';

  /**
   * Get an article.
   *
   * Get an article. Auth not required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticle$Response(params: {

    /**
     * Slug of the article to get
     */
    slug: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'article': apiArticle;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetArticlePath, 'get');
    if (params) {
      rb.path('slug', params.slug, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'article': apiArticle;
        }>;
      })
    );
  }

  /**
   * Get an article.
   *
   * Get an article. Auth not required
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticle(params: {

    /**
     * Slug of the article to get
     */
    slug: string;
    context?: HttpContext
  }
): Observable<{
'article': apiArticle;
}> {

    return this.getArticle$Response(params).pipe(
      map((r: StrictHttpResponse<{
'article': apiArticle;
}>) => r.body as {
'article': apiArticle;
})
    );
  }

  /**
   * Path part for operation updateArticle
   */
  static readonly UpdateArticlePath = '/articles/{slug}';

  /**
   * Update an article.
   *
   * Update an article. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticle$Response(params: {

    /**
     * Slug of the article to update
     */
    slug: string;
    context?: HttpContext

    /**
     * Article to update
     */
    body: {
'article': apiUpdateArticle;
}
  }
): Observable<StrictHttpResponse<{
'article': apiArticle;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.UpdateArticlePath, 'put');
    if (params) {
      rb.path('slug', params.slug, {});
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
        'article': apiArticle;
        }>;
      })
    );
  }

  /**
   * Update an article.
   *
   * Update an article. Auth is required
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticle(params: {

    /**
     * Slug of the article to update
     */
    slug: string;
    context?: HttpContext

    /**
     * Article to update
     */
    body: {
'article': apiUpdateArticle;
}
  }
): Observable<{
'article': apiArticle;
}> {

    return this.updateArticle$Response(params).pipe(
      map((r: StrictHttpResponse<{
'article': apiArticle;
}>) => r.body as {
'article': apiArticle;
})
    );
  }

  /**
   * Path part for operation deleteArticle
   */
  static readonly DeleteArticlePath = '/articles/{slug}';

  /**
   * Delete an article.
   *
   * Delete an article. Auth is required
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle$Response(params: {

    /**
     * Slug of the article to delete
     */
    slug: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.DeleteArticlePath, 'delete');
    if (params) {
      rb.path('slug', params.slug, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete an article.
   *
   * Delete an article. Auth is required
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle(params: {

    /**
     * Slug of the article to delete
     */
    slug: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteArticle$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
