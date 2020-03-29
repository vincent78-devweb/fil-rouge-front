import { TestBed } from '@angular/core/testing';

import { TripManagerService } from './trip-manager.service';

describe('TripManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripManagerService = TestBed.get(TripManagerService);
    expect(service).toBeTruthy();
  });
});
