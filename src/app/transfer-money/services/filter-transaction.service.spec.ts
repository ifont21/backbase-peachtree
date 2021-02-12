import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FilterTransactionService } from './filter-transaction.service';

describe('FilterTransactionService', () => {
  let service: FilterTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterTransactionService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(FilterTransactionService);
  });

  it('should be instantiated', () => {
    expect(service).toBeTruthy();
  });

  describe('filter', () => {
    it('should emit a new search term stream', fakeAsync(() => {
      const searchTerm = 'Amazon';
      let result = null;
      const ticksAfterPossibleSubscription = 501;

      service.searchTerm$$.subscribe((term: string) => {
        result = term;
      });

      service.filter(searchTerm);

      tick(ticksAfterPossibleSubscription);

      expect(result).toBe(searchTerm);
    }));
  });
});
