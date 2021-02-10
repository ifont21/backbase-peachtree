import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionSummary } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionApiService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<TransactionSummary[]> {
    return this.http.get<TransactionSummary[]>(
      'http://localhost:4200/dev/transactions'
    );
  }
}
