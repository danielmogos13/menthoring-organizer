import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTimeIntervalComponent } from './app-time-interval.component';

describe('AppTimeIntervalComponent', () => {
  let component: AppTimeIntervalComponent;
  let fixture: ComponentFixture<AppTimeIntervalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTimeIntervalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTimeIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
