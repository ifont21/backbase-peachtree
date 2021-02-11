import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionApiService } from 'src/app/core/api-services/transaction-api.service';
import { TransactionSummary } from 'src/app/core/models/transaction';
import { take } from 'rxjs/operators';

@Injectable()
export class TransactionService {
  private readonly initialAccountAmount = 5824.76;
  private transactions$ = new BehaviorSubject<TransactionSummary[]>([]);

  // * Simulating Initial Value
  private myAccount$ = new BehaviorSubject<number>(this.initialAccountAmount);

  transactions$$ = this.transactions$.asObservable();
  myAccount$$ = this.myAccount$.asObservable();

  constructor(private transactionApiService: TransactionApiService) {}

  fetchTransactions(): void {
    this.getTransactions()
      .pipe(take(1))
      .subscribe((transactions: TransactionSummary[]) => {
        this.transactions$.next(transactions);
      });
  }

  addNewTransaction(transaction: TransactionSummary, myAccount: number): void {
    const newState = [...this.transactions$.value, transaction];

    this.transactions$.next(newState);
    this.UpdateMyAccount(
      +transaction?.transaction?.amountCurrency?.amount ?? 0,
      this.myAccount$.value
    );
  }

  sortByDate(first: TransactionSummary, second: TransactionSummary): number {
    const dateFirst = new Date(first?.dates?.valueDate);
    const dateSecond = new Date(second?.dates?.valueDate);

    if (dateFirst > dateSecond) return -1;

    if (dateFirst < dateSecond) return 1;

    return 0;
  }

  private UpdateMyAccount(amount: number, current: number): void {
    if (current < amount) return;

    this.myAccount$.next(current - amount);
  }

  private getTransactions(): Observable<TransactionSummary[]> {
    return this.transactionApiService.getTransactions();
  }
}
