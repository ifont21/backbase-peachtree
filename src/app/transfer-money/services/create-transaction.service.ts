import { Injectable } from '@angular/core';
import { TransactionSummary } from 'src/app/core/models/transaction';

@Injectable()
export class CreateTransactionService {
  transaction: TransactionSummary;

  constructor() {
    this.transaction = this.defaultValues();
  }

  addAmount(value: number): CreateTransactionService {
    this.transaction.transaction.amountCurrency.amount = value;
    return this;
  }

  addTo(value: string): CreateTransactionService {
    this.transaction.merchant.name = value;
    return this;
  }

  get(): TransactionSummary {
    return this.transaction;
  }

  clear(): void {
    this.transaction = this.defaultValues();
  }

  private defaultValues(): TransactionSummary {
    return {
      categoryCode: '#12a580',
      dates: {
        valueDate: Date.now().valueOf(),
      },
      transaction: {
        amountCurrency: {
          amount: 0,
          currencyCode: 'EUR',
        },
        type: 'Transfer',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: '',
        accountNumber: '00000',
      },
    };
  }
}
