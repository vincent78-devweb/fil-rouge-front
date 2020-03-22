import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsManagerFilterFormComponent } from './trips-manager-filter-form.component';

describe('TripsManagerFilterFormComponent', () => {
  let component: TripsManagerFilterFormComponent;
  let fixture: ComponentFixture<TripsManagerFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsManagerFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsManagerFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
