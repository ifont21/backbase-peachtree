import { Component, forwardRef, Input, Self } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input-control',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true,
    },
  ],
})
export class InputControlComponent implements ControlValueAccessor {
  @Input() set placeHolder(value: string) {
    this.placeHolderInput = value ?? '';
  }

  @Input() invalid: boolean;

  get placeHolder() {
    return this.placeHolderInput;
  }

  value = '';
  isDisabled: boolean;

  onChange = (_: any) => {};
  onTouch = () => {};

  private placeHolderInput = '';

  onInput(value: string): void {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

  onFocus(): void {
    this.onTouch();
  }

  writeValue(value: any): void {
    this.value = value ?? '';
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
