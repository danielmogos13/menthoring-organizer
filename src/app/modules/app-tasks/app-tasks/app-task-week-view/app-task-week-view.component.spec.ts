import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTaskWeekViewComponent } from './app-task-week-view.component';

describe('AppTaskWeekViewComponent', () => {
  let component: AppTaskWeekViewComponent;
  let fixture: ComponentFixture<AppTaskWeekViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTaskWeekViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTaskWeekViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
