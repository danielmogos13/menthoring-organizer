import { TestBed } from '@angular/core/testing';

import { OrganizerService } from './organizer.service';

describe('TasksServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizerService = TestBed.get(OrganizerService);
    expect(service).toBeTruthy();
  });
});
