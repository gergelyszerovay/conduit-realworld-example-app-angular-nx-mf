import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { defaultHttpRequestErrors, HttpRequestErrors, HttpRequestState, TagsService } from "@conduit/shared/data-access";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { LogState } from "ngx-ngrx-component-store-debug-tools";
import { Observable, switchMap, tap } from "rxjs";

interface PopularTagsState {
  httpRequestState: HttpRequestState;
  tags: string[];
}

const initialPopularTagsState: PopularTagsState = {
  httpRequestState: 'EMPTY',
  tags: []
}

@Injectable()
@LogState({ logLevel: 'debug' })
export class PopularTagsStore extends ComponentStore<PopularTagsState> {

  constructor(
    protected tagsService: TagsService
  ) {
    super(initialPopularTagsState);
  }

  readonly load = this.effect((trigger$: Observable<undefined>) => {
    return trigger$.pipe(
      tap(() => {
        this.setRequestStateLoading();
      }),
      switchMap(() => this.tagsService.getTags().pipe(
        tapResponse(
          (response) => {
            this.setRequestStateSuccess(response.tags);
          },
          (errorResponse: HttpErrorResponse) => {
            if (errorResponse.status === 422) {
              this.setRequestStateError(errorResponse.error.errors);
              return;
            }
            this.setRequestStateError(defaultHttpRequestErrors);
          }
        ),
      )),
    );
  });

  setRequestStateLoading = this.updater((state): PopularTagsState => {
    return {
      ...state,
      httpRequestState: 'LOADING'
    }
  });

  setRequestStateSuccess = this.updater((state, tags: string[]): PopularTagsState => {
    return {
      ...state,
      httpRequestState: 'LOADED',
      tags
    }
  });

  setRequestStateError = this.updater((state, errors: HttpRequestErrors): PopularTagsState => {
    return {
      ...state,
      httpRequestState: { errors }
    }
  });
}
