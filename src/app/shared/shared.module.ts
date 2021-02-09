import { NgModule } from '@angular/core';
import { BbUIModule } from './bb-ui/bb-ui.module';

@NgModule({
  imports: [BbUIModule],
  exports: [BbUIModule],
})
export class SharedModule {}
