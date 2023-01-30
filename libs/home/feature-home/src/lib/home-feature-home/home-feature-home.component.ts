import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularTagsComponent } from '@conduit/home/feature-popular-tags';
import { ArticleFeatureArticleListComponent } from '@conduit/article/feature-article-list';
import { HomeFeatureHomeStore } from './home-feature-home.store';
import { LetModule, PushModule } from '@ngrx/component';
import { SharedStore } from '@conduit/shared/core';

@Component({
  selector: 'conduit-home-feature-home',
  standalone: true,
  imports: [
    CommonModule,
    PopularTagsComponent, ArticleFeatureArticleListComponent,
    LetModule, PushModule
  ],
  providers: [HomeFeatureHomeStore],
  templateUrl: './home-feature-home.component.html',
  styleUrls: ['./home-feature-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeatureHomeComponent {
  constructor(
    protected store: HomeFeatureHomeStore,
    protected sharedStore: SharedStore
  ) { }
}
