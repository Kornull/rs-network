import { TestBed } from '@angular/core/testing';

import { FilterOpenedService } from './filter-opened.service';

describe('FilterOpenedService', () => {
  let service: FilterOpenedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterOpenedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
