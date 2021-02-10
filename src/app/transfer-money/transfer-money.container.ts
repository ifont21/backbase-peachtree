import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionSummary } from '../core/models/transaction';
import { TransactionService } from './services/transactions.service';

@Component({
  selector: 'app-transfer-money',
  template: `<div class="transfer-money">
    <app-make-transfer [myAccountAmount]="5824.76"></app-make-transfer>
    <app-transaction-list
      [summary]="transactions$ | async"
    ></app-transaction-list>
  </div>`,
  styleUrls: ['./transfer-money.component.scss'],
})
export class TransferMoneyContainer implements OnInit {
  transactions$: Observable<TransactionSummary[]>;

  constructor(private service: TransactionService) {}

  ngOnInit(): void {
    this.transactions$ = this.service.getTransactions();
  }
}
