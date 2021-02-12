import { Component, Input } from '@angular/core';
import {
  AbstractInputValueComponent,
  setvalueAccesorProvider,
} from '@app/core/abstracts/input-value-accessor';

@Component({
  selector: 'app-money-input',
  templateUrl: './money-input.component.html',
  styleUrls: ['./money-input.component.scss'],
  providers: [setvalueAccesorProvider(MoneyInputComponent)],
})
export class MoneyInputComponent extends AbstractInputValueComponent<number> {
  @Input() set currency(value: 'EUR' | 'USD') {
    this.currencySymbol = value ?? this.currencySymbol;
  }

  @Input() invalid: boolean;

  get currency(): 'EUR' | 'USD' {
    return this.currencySymbol;
  }

  virtualValue = 0;

  private currencySymbol: 'EUR' | 'USD' = 'EUR';

  onInput(value: string): void {
    this.ownValue = +value;
    this.onTouch();
    this.onChange(this.ownValue);
  }

  writeValue(value: number): void {
    this.virtualValue = this.virtualValue === value ? 0 : value;
    this.ownValue = value;
  }
}
