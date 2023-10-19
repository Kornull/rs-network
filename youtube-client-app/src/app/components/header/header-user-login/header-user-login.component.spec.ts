import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserLoginComponent } from './header-user-login.component';

describe('HeaderUserLoginComponent', () => {
  let component: HeaderUserLoginComponent;
  let fixture: ComponentFixture<HeaderUserLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderUserLoginComponent],
    });
    fixture = TestBed.createComponent(HeaderUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
