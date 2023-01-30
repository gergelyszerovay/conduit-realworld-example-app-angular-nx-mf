import { Injectable } from "@angular/core";
import { ArticleListMode } from "@conduit/article/feature-article-list";
import { ComponentStore } from "@ngrx/component-store";
import { LogState } from "ngx-ngrx-component-store-debug-tools";

interface HomeFeatureHomeState {
  mode: ArticleListMode,
  key: string
}

const initialHomeFeatureHomeState: HomeFeatureHomeState = {
  mode: 'global_feed',
  key: ''
}

@Injectable()
@LogState({ logLevel: 'debug' })
export class HomeFeatureHomeStore extends ComponentStore<HomeFeatureHomeState> {
  constructor(
  ) {
    super(initialHomeFeatureHomeState);
  }

  setTagMode = this.updater((state, key: string): HomeFeatureHomeState => {
    return {
      mode: 'tag',
      key
    }
  });

  setAuthorMode = this.updater((state, key: string): HomeFeatureHomeState => {
    return {
      mode: 'author',
      key
    }
  });

  setGlobalFeedMode = this.updater((): HomeFeatureHomeState => {
    return {
      mode: 'global_feed',
      key: ''
    }
  });
}
