import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerFairsComponent } from './career-fairs.component';

describe('CareerFairsComponent', () => {
  let component: CareerFairsComponent;
  let fixture: ComponentFixture<CareerFairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerFairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerFairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
