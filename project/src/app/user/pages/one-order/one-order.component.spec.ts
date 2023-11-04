import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOrderComponent } from './one-order.component';

describe('OneOrderComponent', () => {
  let component: OneOrderComponent;
  let fixture: ComponentFixture<OneOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneOrderComponent]
    });
    fixture = TestBed.createComponent(OneOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
