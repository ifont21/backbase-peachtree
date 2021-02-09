import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { headerComponent } from './components/header/header.component';

@NgModule({
  imports: [SharedModule],
  declarations: [headerComponent],
  exports: [headerComponent],
})
export class CoreModule {}
