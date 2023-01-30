import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFeatureSignInComponent } from './auth-feature-sign-in.component';

describe('AuthFeatureSignInComponent', () => {
  let component: AuthFeatureSignInComponent;
  let fixture: ComponentFixture<AuthFeatureSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureSignInComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
