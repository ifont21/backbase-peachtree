import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer-money',
  template: `<div class="transfer-money">
    <app-make-transfer [myAccountAmount]="5824.76"></app-make-transfer>
    <app-transfer-list></app-transfer-list>
  </div>`,
  styleUrls: ['./transfer-money.component.scss'],
})
export class TransferMoneyComponent {}
