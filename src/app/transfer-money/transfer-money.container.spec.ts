import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FilterTransactionService } from './services/filter-transaction.service';
import { TransactionService } from './services/transactions.service';
import { TransferMoneyContainer } from './transfer-money.container';
import * as transactionsMock from '@app/shared/bb-ui/mock-data/transactions.json';
import { of } from 'rxjs';

describe('TransferMoneyContainer', () => {
  let component: TransferMoneyContainer;
  let fixture: ComponentFixture<TransferMoneyContainer>;
  let service: jasmine.SpyObj<TransactionService>;
  let filterService: FilterTransactionService;

  const mockService = jasmine.createSpyObj('TransactionService', [
    'fetchTransactions',
    'sortByDate',
  ]);

  const mockFilterService = jasmine.createSpyObj('FilterTransactionService', [
    'filter',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferMoneyContainer],
      providers: [
        { provide: TransactionService, useValue: mockService },
        { provide: FilterTransactionService, useValue: mockFilterService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMoneyContainer);
    component = fixture.componentInstance;
    service = TestBed.inject(TransactionService) as any;
    filterService = TestBed.inject(FilterTransactionService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should combine search term and transactions to get the list', fakeAsync(() => {
      service.fetchTransactions.and.callThrough();
      service.sortByDate.and.callThrough();

      service.transactions$$ = of(transactionsMock.data);
      filterService.searchTerm$$ = of('Amazon');

      fixture.detectChanges();

      expect(service.fetchTransactions).toHaveBeenCalled();

      tick();

      expect(service.sortByDate).toHaveBeenCalledWith(
        jasmine.any(Object),
        jasmine.any(Object)
      );
    }));

    it('should combine search term and transactions to get the list', fakeAsync(() => {
      service.fetchTransactions.and.callThrough();
      service.sortByDate.and.callThrough();
      let listLength = 0;

      service.transactions$$ = of(transactionsMock.data);
      filterService.searchTerm$$ = of('Amazon');

      fixture.detectChanges();
      expect(service.fetchTransactions).toHaveBeenCalled();

      component.transactions$.subscribe((transactionList) => {
        listLength = transactionList.length;
      });

      tick();

      expect(listLength === 1).toBeTruthy();

      expect(service.sortByDate).toHaveBeenCalledWith(
        jasmine.any(Object),
        jasmine.any(Object)
      );
    }));

    it('should get the whole list when searh criteria is empty', fakeAsync(() => {
      service.fetchTransactions.and.callThrough();
      service.sortByDate.and.callThrough();
      let listLength = 0;

      service.transactions$$ = of(transactionsMock.data);
      filterService.searchTerm$$ = of('');

      fixture.detectChanges();

      component.transactions$.subscribe((transactionList) => {
        listLength = transactionList.length;
      });

      tick();

      expect(listLength === transactionsMock.data.length).toBeTruthy();
    }));
  });
});
