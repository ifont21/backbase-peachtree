import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BbUIModule } from './bb-ui/bb-ui.module';
import { CardComponent } from './components/card/card.component';
import { FieldErrorsComponent } from './components/field-errors/field-errors.component';
import { InputControlComponent } from './components/input/input.component';
import { MoneyInputComponent } from './components/money-input/money-input.component';

@NgModule({
  imports: [BbUIModule, CommonModule, ReactiveFormsModule],
  declarations: [
    CardComponent,
    InputControlComponent,
    MoneyInputComponent,
    FieldErrorsComponent,
  ],
  exports: [
    // Modules
    BbUIModule,
    CommonModule,
    ReactiveFormsModule,

    // Components
    CardComponent,
    InputControlComponent,
    MoneyInputComponent,
    FieldErrorsComponent,
  ],
})
export class SharedModule {}
