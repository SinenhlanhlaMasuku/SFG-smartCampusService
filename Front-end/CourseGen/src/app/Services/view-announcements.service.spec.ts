import { TestBed } from '@angular/core/testing';

import { ViewAnnouncementsService } from './view-announcements.service';

describe('ViewAnnouncementsService', () => {
  let service: ViewAnnouncementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewAnnouncementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
