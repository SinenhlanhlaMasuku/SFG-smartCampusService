import { TestBed } from '@angular/core/testing';

import { ViewScheduleService } from './view-schedule.service';

describe('ViewScheduleService', () => {
  let service: ViewScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
