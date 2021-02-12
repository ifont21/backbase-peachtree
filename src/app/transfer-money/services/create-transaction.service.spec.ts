import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TransactionSummary } from '@app/core/models/transaction';
import { CreateTransactionService } from './create-transaction.service';

describe('CreateTransactionService', () => {
  let service: CreateTransactionService;
  const defaultTransaction = {
    categoryCode: '#12a580',
    dates: {
      valueDate: Date.now().valueOf(),
    },
    transaction: {
      amountCurrency: {
        amount: 0,
        currencyCode: 'EUR',
      },
      type: 'Transaction',
      creditDebitIndicator: 'DBIT',
    },
    merchant: {
      name: '',
      accountNumber: '00000',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateTransactionService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CreateTransactionService);
  });

  it('should be instantiated', () => {
    expect(service).toBeTruthy();
  });

  describe('All in one', () => {
    it('should build a new transaction and clear it afterwards', () => {
      const newOne: TransactionSummary = {
        ...defaultTransaction,
        transaction: {
          ...defaultTransaction.transaction,
          amountCurrency: {
            ...defaultTransaction.transaction.amountCurrency,
            amount: 23.4,
          },
        },
        merchant: {
          ...defaultTransaction.merchant,
          name: 'Jhon Smith',
        },
      };

      const newTransaction = service.addAmount(23.4).addTo('Jhon Smith').get();

      expect(newTransaction.transaction.amountCurrency.amount).toBe(
        newOne.transaction.amountCurrency.amount
      );
      expect(newTransaction.merchant.name).toBe(newOne.merchant.name);

      service.clear();

      expect(defaultTransaction.transaction.amountCurrency.amount).toBe(0);
    });
  });
});
