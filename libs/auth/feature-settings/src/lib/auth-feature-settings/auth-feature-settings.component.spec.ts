import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFeatureSettingsComponent } from './auth-feature-settings.component';

describe('AuthFeatureSettingsComponent', () => {
  let component: AuthFeatureSettingsComponent;
  let fixture: ComponentFixture<AuthFeatureSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
