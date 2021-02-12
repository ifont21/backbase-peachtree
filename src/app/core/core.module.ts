import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [SharedModule, HttpClientModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
