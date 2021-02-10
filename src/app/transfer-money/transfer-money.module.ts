import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { ReviewComponent } from './components/review/review.component';
import { TransferListComponent } from './components/transfer-list/transfer-list.component';
import { TransferMoneyComponent } from './transfer-money.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    MakeTransferComponent,
    TransferListComponent,
    TransferMoneyComponent,
    ReviewComponent,
  ],
  providers: [CurrencyPipe],
})
export class TransferMoneyModule {}
