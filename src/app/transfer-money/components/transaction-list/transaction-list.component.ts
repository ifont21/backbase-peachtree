import { Component, Input } from '@angular/core';
import { TransactionSummary } from 'src/app/core/models/transaction';
import { FilterTransactionService } from '../../services/filter-transaction.service';
import { TransactionService } from '../../services/transactions.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent {
  @Input() summary: TransactionSummary[];

  constructor(private filterService: FilterTransactionService) {}

  onFilter(term: string): void {
    this.filterService.filter(term);
  }
}
