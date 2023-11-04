import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMainComponent } from './auth-main.component';

describe('AuthMainComponent', () => {
  let component: AuthMainComponent;
  let fixture: ComponentFixture<AuthMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthMainComponent]
    });
    fixture = TestBed.createComponent(AuthMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
