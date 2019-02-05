import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerFairItemComponent } from './career-fair-item.component';

describe('CareerFairItemComponent', () => {
  let component: CareerFairItemComponent;
  let fixture: ComponentFixture<CareerFairItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerFairItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerFairItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
