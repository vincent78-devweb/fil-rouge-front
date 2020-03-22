import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSubscribesComponent } from './last-subscribes.component';

describe('LastSubscribesComponent', () => {
  let component: LastSubscribesComponent;
  let fixture: ComponentFixture<LastSubscribesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastSubscribesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastSubscribesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
