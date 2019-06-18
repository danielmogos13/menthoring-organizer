import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyStatsComponent } from './money-stats.component';

describe('MoneyStatsComponent', () => {
  let component: MoneyStatsComponent;
  let fixture: ComponentFixture<MoneyStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
