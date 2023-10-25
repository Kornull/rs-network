import { TestBed } from '@angular/core/testing';

import { FilterActivateService } from './filter-activate.service';

describe('FilterActivateService', () => {
  let service: FilterActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
