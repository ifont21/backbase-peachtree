import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface ControlErrors {
  [error: string]: any;
}

@Component({
  selector: 'app-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss'],
})
export class FieldErrorsComponent implements OnChanges {
  @Input() errors: ControlErrors;
  @Input() dirty: boolean;
  @Input() touched: boolean;
  @Input() invalid: boolean;

  errorMsg: string;
  hasErrors: boolean;

  ngOnChanges(): void {
    this.errorMsg = this.getErrorMessages(this.errors ?? {});
  }

  private getErrorMessages({ required, min, message }: ControlErrors): string {
    if (required) {
      return 'This field is required';
    }

    if (min) {
      return 'Negative numbers are not allowed';
    }

    return message;
  }
}
