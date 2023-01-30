import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiArticle, ArticlesService, defaultHttpRequestErrors, HttpRequestErrors, HttpRequestState, UserAndAuthenticationService } from "@conduit/shared/data-access";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { LogState } from "ngx-ngrx-component-store-debug-tools";
import { Observable, switchMap, tap } from "rxjs";

export type Article = apiArticle;

export type ArticleListMode = 'feed' | 'tag' | 'author' | 'global_feed' | 'favorited';

interface ArticleFeatureArticleListState {
  httpRequestState: HttpRequestState;
  articles: Article[];
  articlesCount: number,
  currentPage: number,
  mode: ArticleListMode,
  key: string
}

const initialArticleFeatureArticleListState: ArticleFeatureArticleListState = {
  httpRequestState: 'EMPTY',
  articles: [],
  articlesCount: 0,
  currentPage: 0,
  mode: 'global_feed',
  key: ''
}

@Injectable()
@LogState({ logLevel: 'debug' })
export class ArticleFeatureArticleListStore extends ComponentStore<ArticleFeatureArticleListState> {
  readonly httpRequestState$: Observable<HttpRequestState> = this.select(state => state.httpRequestState);
  readonly articles$: Observable<Article[]> = this.select(state => state.articles);

  constructor(
    protected userAndAuthenticationService: UserAndAuthenticationService,
    protected articlesService: ArticlesService
  ) {
    super(initialArticleFeatureArticleListState);
  }

  readonly load = this.effect((params$: Observable<{
    mode: ArticleListMode,
    key: string
  }>) => {
    return params$.pipe(
      tap(() => {
        this.setRequestStateLoading();
      }),
      switchMap((params) => {
        return (params.mode === 'feed' ?
          this.articlesService.getArticlesFeed({
            limit: 10
          }) :
          this.articlesService.getArticles({
            limit: 10,
            ...(params.mode === 'tag' ? { tag: params.key } : { }),
            ...(params.mode === 'author' ? { author: params.key } : { }),
            ...(params.mode === 'favorited' ? { favorited: params.key } : { }),
          })
        ).pipe(
          tapResponse(
            (response) => {
              this.setRequestStateSuccess(response);
            },
            (errorResponse: HttpErrorResponse) => {
              if (errorResponse.status === 422) {
                this.setRequestStateError(errorResponse.error.errors);
                return;
              }
              this.setRequestStateError(defaultHttpRequestErrors);
            }
          ),
        );
      }),
    );
  });

  setRequestStateLoading = this.updater((state): ArticleFeatureArticleListState => {
    return {
      ...state,
      httpRequestState: 'LOADING'
    }
  });

  setRequestStateSuccess = this.updater((state, params: { articles: Article[], articlesCount: number }): ArticleFeatureArticleListState => {
    return {
      ...state,
      httpRequestState: 'LOADED',
      ...params
    }
  });

  setRequestStateError = this.updater((state, errors: HttpRequestErrors): ArticleFeatureArticleListState => {
    return {
      ...state,
      httpRequestState: { errors }
    }
  });
}
