import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedMealsCounterComponent } from './ordered-meals-counter.component';

describe('OrderedMealsCounterComponent', () => {
  let component: OrderedMealsCounterComponent;
  let fixture: ComponentFixture<OrderedMealsCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedMealsCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedMealsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
