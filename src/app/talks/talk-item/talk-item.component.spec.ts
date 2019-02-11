import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkItemComponent } from './talk-item.component';

describe('TalkItemComponent', () => {
  let component: TalkItemComponent;
  let fixture: ComponentFixture<TalkItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
