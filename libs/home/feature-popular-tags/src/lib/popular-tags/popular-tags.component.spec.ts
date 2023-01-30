import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPopularTagsComponent } from './ui-popular-tags.component';

describe('UiPopularTagsComponent', () => {
  let component: UiPopularTagsComponent;
  let fixture: ComponentFixture<UiPopularTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPopularTagsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiPopularTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
