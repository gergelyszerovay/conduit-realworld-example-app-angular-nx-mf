import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFeatureSignUpComponent } from './auth-feature-sign-up.component';

describe('AuthFeatureSignUpComponent', () => {
  let component: AuthFeatureSignUpComponent;
  let fixture: ComponentFixture<AuthFeatureSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureSignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
