import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFilterFormComponent } from './users-filter-form.component';

describe('UsersFilterFormComponent', () => {
  let component: UsersFilterFormComponent;
  let fixture: ComponentFixture<UsersFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
