import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTaskDayViewComponent } from './app-task-day-view.component';

describe('AppTaskDayViewComponent', () => {
  let component: AppTaskDayViewComponent;
  let fixture: ComponentFixture<AppTaskDayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTaskDayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTaskDayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
