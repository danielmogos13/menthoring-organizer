import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMoneyWeekviewComponent } from './app-money-weekview.component';

describe('AppMoneyWeekviewComponent', () => {
  let component: AppMoneyWeekviewComponent;
  let fixture: ComponentFixture<AppMoneyWeekviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMoneyWeekviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMoneyWeekviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
