import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetModule, PushModule } from '@ngrx/component';
import { ArticleFeatureArticleListStore, ArticleListMode } from './article-feature-article-list.store';
import { ArticleFeatureArticleListPreviewComponent } from '../article-feature-article-list-preview/article-feature-article-list-preview.component';
import { defaultHttpRequestErrorMessage, HttpRequestStateErrorPipe } from '@conduit/shared/data-access';

@Component({
  selector: 'conduit-article-feature-article-list',
  standalone: true,
  imports: [
    CommonModule, LetModule, PushModule,
    ArticleFeatureArticleListPreviewComponent, HttpRequestStateErrorPipe
  ],
  providers: [ArticleFeatureArticleListStore],
  templateUrl: './article-feature-article-list.component.html',
  styleUrls: ['./article-feature-article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleFeatureArticleListComponent implements OnChanges {
  @Input() mode: ArticleListMode = 'global_feed';
  @Input() key = '';

  defaultHttpRequestErrorMessage = defaultHttpRequestErrorMessage;

  constructor(
    protected store: ArticleFeatureArticleListStore
  ) { }

  ngOnChanges(): void {
    this.store.load({ mode: this.mode, key: this.key });
  }
}
