import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { ReviewComponent } from './components/review/review.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
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
  providers: [CurrencyPipe, TransactionService],
})
export class TransferMoneyModule {}
