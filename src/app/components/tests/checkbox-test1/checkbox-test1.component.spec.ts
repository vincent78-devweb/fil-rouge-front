import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTest1Component } from './checkbox-test1.component';

describe('CheckboxTest1Component', () => {
  let component: CheckboxTest1Component;
  let fixture: ComponentFixture<CheckboxTest1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxTest1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxTest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
