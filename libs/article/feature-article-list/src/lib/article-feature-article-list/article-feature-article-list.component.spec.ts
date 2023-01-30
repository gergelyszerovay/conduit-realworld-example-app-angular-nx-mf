import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFeatureArticleListComponent } from './article-feature-article-list.component';

describe('ArticleFeatureArticleListComponent', () => {
  let component: ArticleFeatureArticleListComponent;
  let fixture: ComponentFixture<ArticleFeatureArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleFeatureArticleListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleFeatureArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
