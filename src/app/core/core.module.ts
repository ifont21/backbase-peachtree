import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { headerComponent } from './components/header/header.component';

@NgModule({
  imports: [SharedModule, HttpClientModule],
  declarations: [headerComponent],
  exports: [headerComponent],
})
export class CoreModule {}
