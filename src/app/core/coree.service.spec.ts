import { TestBed } from '@angular/core/testing';

import { CoreeService } from './coree.service';

describe('CoreeService', () => {
  let service: CoreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
