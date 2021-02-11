import { InjectionToken } from '@angular/core';

export interface ControlErrors {
  [error: string]: any;
}

export type ErrorHandlerMessages = () => {
  getErrorMessageForControls: (errors: ControlErrors) => string;
};

export const HANDLER = new InjectionToken<ErrorHandlerMessages>(
  'get error messages'
);

export const handlerProvider = {
  provide: HANDLER,
  useValue: errorMessageHandler,
};

function errorMessageHandler() {
  const getErrorMessageForControls = ({
    required,
    min,
    message,
  }: ControlErrors) => {
    if (required) {
      return 'This field is required';
    }

    if (min) {
      return 'Negative numbers are not allowed';
    }

    return message;
  };

  return {
    getErrorMessageForControls,
    // * Add more Error Message Handler
  };
}
