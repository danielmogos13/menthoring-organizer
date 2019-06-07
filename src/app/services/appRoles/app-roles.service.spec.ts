import { TestBed } from '@angular/core/testing';

import { UserRole } from './app-roles.service';

describe('AppRolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRole = TestBed.get(UserRole);
    expect(service).toBeTruthy();
  });
});
