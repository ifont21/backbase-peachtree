import { Component, Input } from '@angular/core';
import { FilterTransactionService } from '@app/transfer-money/services/filter-transaction.service';
import { TransactionSummary } from 'src/app/core/models/transaction';

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
