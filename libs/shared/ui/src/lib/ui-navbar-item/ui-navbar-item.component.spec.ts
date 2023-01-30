import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiNavbarItemComponent } from './ui-navbar-item.component';

describe('UiNavbarItemComponent', () => {
  let component: UiNavbarItemComponent;
  let fixture: ComponentFixture<UiNavbarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiNavbarItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiNavbarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
