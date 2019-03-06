import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCareerfairComponent } from './create-careerfair.component';

describe('CreateCareerfairComponent', () => {
  let component: CreateCareerfairComponent;
  let fixture: ComponentFixture<CreateCareerfairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCareerfairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCareerfairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
