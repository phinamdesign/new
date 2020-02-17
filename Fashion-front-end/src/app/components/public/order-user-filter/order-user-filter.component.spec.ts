import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUserFilterComponent } from './order-user-filter.component';

describe('OrderUserFilterComponent', () => {
  let component: OrderUserFilterComponent;
  let fixture: ComponentFixture<OrderUserFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUserFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
