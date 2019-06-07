import { TestBed } from '@angular/core/testing';

import { AppLoginService } from './app-login.service';

describe('AppLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppLoginService = TestBed.get(AppLoginService);
    expect(service).toBeTruthy();
  });
});
