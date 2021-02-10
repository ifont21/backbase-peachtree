import { Component, Input } from '@angular/core';
import { TransactionSummary } from 'src/app/core/models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent {
  @Input() summary: TransactionSummary[];
}
