import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedCompanyComponent } from './added-company.component';

describe('AddedCompanyComponent', () => {
  let component: AddedCompanyComponent;
  let fixture: ComponentFixture<AddedCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
