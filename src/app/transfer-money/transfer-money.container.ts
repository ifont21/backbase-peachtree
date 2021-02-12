import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionSummary } from '../core/models/transaction';
import { FilterTransactionService } from './services/filter-transaction.service';
import { TransactionService } from './services/transactions.service';

@Component({
  selector: 'app-transfer-money',
  template: `<div class="transfer-money">
    <app-make-transfer
      [myAccountAmount]="myAccount$ | async"
    ></app-make-transfer>

    <app-transaction-list
      [summary]="transactions$ | async"
    ></app-transaction-list>
  </div>`,
  styleUrls: ['./transfer-money.component.scss'],
})
export class TransferMoneyComponent implements OnInit {
  transactions$: Observable<TransactionSummary[]>;
  searchTerm$: Observable<string>;
  myAccount$: Observable<number>;

  constructor(
    private service: TransactionService,
    private filterService: FilterTransactionService
  ) {}

  ngOnInit(): void {
    this.myAccount$ = this.service.myAccount$$;
    this.searchTerm$ = this.filterService.searchTerm$$;

    this.transactions$ = combineLatest([
      this.service.transactions$$,
      this.searchTerm$,
    ]).pipe(map(this.sortTransactions), map(this.filterTransactionsByTerm));

    this.service.fetchTransactions();
  }

  private filterTransactionsByTerm([transactions, term]: [
    TransactionSummary[],
    string
  ]): TransactionSummary[] {
    if (!term) return transactions;

    return transactions.filter((transaction) =>
      transaction?.merchant?.name
        .toLocaleLowerCase()
        .includes(term.toLowerCase())
    );
  }

  private sortTransactions = ([transactions, term]: [
    TransactionSummary[],
    string
  ]) => {
    return [transactions.sort(this.service.sortByDate), term];
  }
}
