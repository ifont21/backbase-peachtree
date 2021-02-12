import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TransactionSummary } from '../models/transaction';
import { catchError } from 'rxjs/operators';
import * as transactionJSON from '@app/shared/bb-ui/mock-data/transactions.json';

@Injectable({
  providedIn: 'root',
})
export class TransactionApiService {
  private baseURL = 'http://localhost:4200/dev';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<TransactionSummary[]> {
    return this.http
      .get<TransactionSummary[]>(`${this.baseURL}/transactions`)
      .pipe(catchError((_) => of(transactionJSON.data)));
  }
}
