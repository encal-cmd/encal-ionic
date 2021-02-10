import { TestBed } from '@angular/core/testing';

import { AprovacaoService } from './aprovacao.service';

describe('AprovacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AprovacaoService = TestBed.get(AprovacaoService);
    expect(service).toBeTruthy();
  });
});
