import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTest2Component } from './checkbox-test2.component';

describe('CheckboxTest2Component', () => {
  let component: CheckboxTest2Component;
  let fixture: ComponentFixture<CheckboxTest2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxTest2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
