import { TestBed } from '@angular/core/testing';

import { PrestadoresService } from './prestadores.service';

describe('PrestadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrestadoresService = TestBed.get(PrestadoresService);
    expect(service).toBeTruthy();
  });
});
