import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../article-feature-article-list/article-feature-article-list.store';

@Component({
  selector: 'conduit-article-feature-article-list-preview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-feature-article-list-preview.component.html',
  styleUrls: ['./article-feature-article-list-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleFeatureArticleListPreviewComponent {
  @Input() article?: Article;
  @Output() openArticle: EventEmitter<string> = new EventEmitter();
  @Output() favorite: EventEmitter<string> = new EventEmitter();
  @Output() unFavorite: EventEmitter<string> = new EventEmitter();

  toggleFavorite(article: Article) {
    if (article.favorited) {
      this.unFavorite.emit(article.slug);
    } else {
      this.favorite.emit(article.slug);
    }
  }
}
