import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViewsComponent } from './app-views.component';

describe('AppViewsComponent', () => {
  let component: AppViewsComponent;
  let fixture: ComponentFixture<AppViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
