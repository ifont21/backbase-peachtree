import { Component, Inject, Input, OnChanges } from '@angular/core';
import {
  ControlErrors,
  ErrorHandlerMessages,
  HANDLER,
  handlerProvider,
} from '@app/core/handlers/error-message.handler';

@Component({
  selector: 'app-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss'],
  providers: [handlerProvider],
})
export class FieldErrorsComponent implements OnChanges {
  @Input() errors: ControlErrors;
  @Input() dirty: boolean;
  @Input() touched: boolean;
  @Input() invalid: boolean;

  errorMsg: string;
  hasErrors: boolean;

  constructor(
    @Inject(HANDLER) private errorMessageHandler: ErrorHandlerMessages
  ) {}

  ngOnChanges(): void {
    this.errorMsg = this.errorMessageHandler().getErrorMessageForControls(
      this.errors ?? {}
    );
  }
}
