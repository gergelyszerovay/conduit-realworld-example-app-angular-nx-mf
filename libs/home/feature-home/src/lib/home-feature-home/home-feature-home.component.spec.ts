import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeatureHomeComponent } from './home-feature-home.component';

describe('HomeFeatureHomeComponent', () => {
  let component: HomeFeatureHomeComponent;
  let fixture: ComponentFixture<HomeFeatureHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeatureHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFeatureHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
