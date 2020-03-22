import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTripsManagerComponent } from './my-trips-manager.component';

describe('MyTripsManagerComponent', () => {
  let component: MyTripsManagerComponent;
  let fixture: ComponentFixture<MyTripsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTripsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTripsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
