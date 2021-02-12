import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TransactionApiService } from '@app/core/api-services/transaction-api.service';
import { TransactionService } from './transactions.service';
import * as transactionsMock from '@app/shared/bb-ui/mock-data/transactions.json';
import { of } from 'rxjs';

describe('TransactionService', () => {
  let service: TransactionService;
  let apiService: jasmine.SpyObj<TransactionApiService>;

  const mockTransactionApiService = jasmine.createSpyObj(
    'TransactionApiService',
    ['getTransactions']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionApiService,
          useValue: mockTransactionApiService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(TransactionService);
    apiService = TestBed.inject(TransactionApiService) as any;
  });

  it('should be instantiated', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchTransactions', () => {
    it('should add new transactions when this is success', fakeAsync(() => {
      apiService.getTransactions.and.returnValue(of(transactionsMock.data));
      let result = [];

      service.transactions$$.subscribe((transactions) => {
        result = transactions;
      });

      service.fetchTransactions();

      tick();

      expect(result.length > 0).toBeTruthy();
    }));
  });

  describe('addNewTransaction', () => {
    const newTransaction = {
      categoryCode: '#12a580',
      dates: {
        valueDate: Date.now().valueOf(),
      },
      transaction: {
        amountCurrency: {
          amount: 1.23,
          currencyCode: 'EUR',
        },
        type: 'Transaction',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: 'Mat Daemon',
        accountNumber: '00000',
      },
    };

    it('should add a new transaction when this method is invoked', fakeAsync(() => {
      let result = [];

      service.transactions$$.subscribe((transactions) => {
        result = transactions;
      });

      service.addNewTransaction(newTransaction);

      tick();

      expect(result).toEqual([newTransaction]);
    }));

    it('should update My account when a new transaction has been processed', fakeAsync(() => {
      let myNewAccount = 0;

      service.myAccount$$.subscribe((myAccount) => {
        myNewAccount = myAccount;
      });

      newTransaction.transaction.amountCurrency.amount = 824.76;

      service.addNewTransaction(newTransaction);

      tick();

      expect(myNewAccount).toBe(5000.0);
    }));
  });

  describe('sortByDate', () => {
    it('should sort the transaction list by date in a descending way', () => {
      const transactionList = transactionsMock.data.slice(0, 2).reverse();
      const [firstCompare, secondCompare] = transactionList;

      const [first, second] = transactionList.sort(service.sortByDate);

      expect(firstCompare).toEqual(second);
      expect(secondCompare).toEqual(first);
    });
  });
});
