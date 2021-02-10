import { RouterModule, Routes } from '@angular/router';
import { TransferMoneyContainer } from './transfer-money/transfer-money.container';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transfer',
    pathMatch: 'full',
  },
  {
    path: 'transfer',
    component: TransferMoneyContainer,
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
