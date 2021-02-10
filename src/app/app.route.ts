import { RouterModule, Routes } from '@angular/router';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transfer',
    pathMatch: 'full',
  },
  {
    path: 'transfer',
    component: TransferMoneyComponent,
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
