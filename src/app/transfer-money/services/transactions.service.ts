import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionApiService } from 'src/app/core/api-services/transaction-api.service';
import { TransactionSummary } from 'src/app/core/models/transaction';
import { map } from 'rxjs/operators';

@Injectable()
export class TransactionService {
  constructor(private transactionApiService: TransactionApiService) {}

  getTransactions(): Observable<TransactionSummary[]> {
    return this.transactionApiService.getTransactions().pipe(
      map((transactions: TransactionSummary[]) => {
        return transactions.sort(this.sortByDate);
      })
    );
  }

  private sortByDate(
    first: TransactionSummary,
    second: TransactionSummary
  ): number {
    const dateFirst = new Date(first?.dates?.valueDate);
    const dateSecond = new Date(second?.dates?.valueDate);

    if (dateFirst > dateSecond) return -1;

    if (dateFirst < dateSecond) return 1;

    return 0;
  }
}
