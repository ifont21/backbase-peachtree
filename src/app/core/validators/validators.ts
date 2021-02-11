import { InjectionToken } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export type CustomValidators = () => {
  numberRequired: () => ValidatorFn;
  notEnoughBalance: (currentValue: number) => ValidatorFn;
};

export const CUSTOM_VALIDATORS = new InjectionToken<CustomValidators>(
  'get custom validators'
);

export const CustomValidatorsProvider = {
  provide: CUSTOM_VALIDATORS,
  useValue: customValidators,
};

function customValidators() {
  const numberRequired = (): ValidatorFn => ({
    value,
  }: AbstractControl): { [key: string]: any | null } => {
    return !value ? { required: true } : null;
  };

  const notEnoughBalance = (currentValue: number): ValidatorFn => ({
    value,
  }: AbstractControl): { [key: string]: any | null } => {
    return currentValue < value
      ? { message: 'There is not enough balance' }
      : null;
  };

  return {
    numberRequired,
    notEnoughBalance,
  };
}
