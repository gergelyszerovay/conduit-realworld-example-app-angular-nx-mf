import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeatureProfileComponent } from './profile-feature-profile.component';

describe('ProfileFeatureProfileComponent', () => {
  let component: ProfileFeatureProfileComponent;
  let fixture: ComponentFixture<ProfileFeatureProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFeatureProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFeatureProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
