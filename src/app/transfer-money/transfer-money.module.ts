import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { ReviewComponent } from './components/review/review.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { CreateTransactionService } from './services/create-transaction.service';
import { FilterTransactionService } from './services/filter-transaction.service';
import { TransactionService } from './services/transactions.service';
import { TransferMoneyContainer } from './transfer-money.container';

@NgModule({
  imports: [SharedModule],
  declarations: [
    MakeTransferComponent,
    TransactionListComponent,
    TransferMoneyContainer,
    ReviewComponent,
  ],
  providers: [
    CurrencyPipe,
    TransactionService,
    CreateTransactionService,
    FilterTransactionService,
  ],
})
export class TransferMoneyModule {}
