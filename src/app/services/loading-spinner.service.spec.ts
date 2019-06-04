import { TestBed } from '@angular/core/testing';

import { LoadingSpinnerServiceService } from './loading-spinner.service';

describe('LoadingSpinnerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingSpinnerServiceService = TestBed.get(LoadingSpinnerServiceService);
    expect(service).toBeTruthy();
  });
});
