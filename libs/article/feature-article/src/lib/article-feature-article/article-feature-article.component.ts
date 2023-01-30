import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'conduit-article-feature-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-feature-article.component.html',
  styleUrls: ['./article-feature-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleFeatureArticleComponent {}
