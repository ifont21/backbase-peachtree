import { Component, Input } from '@angular/core';
import {
  AbstractInputValueComponent,
  setvalueAccesorProvider,
} from '@app/core/abstracts/input-value-accessor';

@Component({
  selector: 'app-input-control',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [setvalueAccesorProvider(InputControlComponent)],
})
export class InputControlComponent extends AbstractInputValueComponent<string> {
  @Input() invalid: boolean;

  onInput(value: any): void {
    this.ownValue = value;
    this.onTouch();
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.ownValue = value ?? '';
  }
}
