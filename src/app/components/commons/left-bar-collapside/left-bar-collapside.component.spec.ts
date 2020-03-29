import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftBarCollapsideComponent } from './left-bar-collapside.component';

describe('LeftBarCollapsideComponent', () => {
  let component: LeftBarCollapsideComponent;
  let fixture: ComponentFixture<LeftBarCollapsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftBarCollapsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftBarCollapsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
