import { Component, forwardRef, Input, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export function setvalueAccesorProvider(
  provider: Type<any>
): any {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => provider),
    multi: true,
  };
}

@Component({ template: '' })
export abstract class AbstractInputValueComponent<T = any>
  implements ControlValueAccessor {
  @Input() set placeHolder(value: string) {
    this.placeHolderInput = value ?? '';
  }

  isDisabled: boolean;

  protected ownValue: T;

  private placeHolderInput = '';

  onChange = (_: any) => {};
  onTouch = () => {};

  get value(): T {
    return this.ownValue;
  }

  get placeHolder(): string {
    return this.placeHolderInput;
  }

  abstract writeValue(value: any): void;

  abstract onInput(value: any): void;

  onFocusOut(): void {
    this.onTouch();
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
