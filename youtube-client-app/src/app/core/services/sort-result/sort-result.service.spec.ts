import { TestBed } from '@angular/core/testing';

import { SortResultService } from './sort-result.service';

describe('SortResultService', () => {
  let service: SortResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
