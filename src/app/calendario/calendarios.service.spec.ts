import { TestBed } from '@angular/core/testing';

import { CalendariosService } from './calendarios.service';

describe('CalendariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendariosService = TestBed.get(CalendariosService);
    expect(service).toBeTruthy();
  });
});
