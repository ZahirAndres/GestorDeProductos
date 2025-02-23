import { TestBed } from '@angular/core/testing';

import { CrearProductosService } from './crear-productos.service';

describe('CrearProductosService', () => {
  let service: CrearProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
