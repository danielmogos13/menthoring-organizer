import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPerformedComponent } from './action-performed.component';

describe('ActionPerformedComponent', () => {
  let component: ActionPerformedComponent;
  let fixture: ComponentFixture<ActionPerformedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPerformedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPerformedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
