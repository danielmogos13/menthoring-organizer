import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMoneyDayViewComponent } from './app-money-day-view.component';

describe('AppMoneyDayViewComponent', () => {
  let component: AppMoneyDayViewComponent;
  let fixture: ComponentFixture<AppMoneyDayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMoneyDayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMoneyDayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
