import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFeatureArticleComponent } from './article-feature-article.component';

describe('ArticleFeatureArticleComponent', () => {
  let component: ArticleFeatureArticleComponent;
  let fixture: ComponentFixture<ArticleFeatureArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleFeatureArticleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleFeatureArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
