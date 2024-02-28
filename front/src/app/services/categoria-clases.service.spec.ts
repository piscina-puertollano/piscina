import { TestBed } from '@angular/core/testing';

import { CategoriaClasesService } from './categoria-clases.service';

describe('CategoriaClasesService', () => {
  let service: CategoriaClasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaClasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
