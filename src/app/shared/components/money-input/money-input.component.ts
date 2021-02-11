import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-money-input',
  templateUrl: './money-input.component.html',
  styleUrls: ['./money-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoneyInputComponent),
      multi: true,
    },
  ],
})
export class MoneyInputComponent implements ControlValueAccessor {
  @ViewChild('input') input: ElementRef;

  @Input() set placeHolder(value: string) {
    this.placeHolderInput = value ?? '';
  }

  @Input() set currency(value: 'EUR' | 'USD') {
    this.currencySymbol = value ?? this.currencySymbol;
  }

  @Input() invalid: boolean;

  get placeHolder() {
    return this.placeHolderInput;
  }

  get currency() {
    return this.currencySymbol;
  }

  value = 0;
  virtualValue = 0;

  isDisabled: boolean;

  onChange = (_: any) => {};
  onTouch = () => {};

  private placeHolderInput = '';
  private currencySymbol: 'EUR' | 'USD' = 'EUR';

  onInput(value: string): void {
    this.value = +value;
    this.onTouch();
    this.onChange(this.value);
  }

  onFocus(): void {
    this.onTouch();
  }

  writeValue(value: number): void {
    this.virtualValue = this.virtualValue === value ? 0 : value;
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
