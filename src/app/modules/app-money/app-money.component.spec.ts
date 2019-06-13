import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMoneyComponent } from './app-money.component';

describe('AppMoneyComponent', () => {
  let component: AppMoneyComponent;
  let fixture: ComponentFixture<AppMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
