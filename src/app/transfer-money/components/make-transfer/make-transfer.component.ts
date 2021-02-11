import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CreateTransactionService } from '../../services/create-transaction.service';
import { TransactionService } from '../../services/transactions.service';

const numberRequired = (): ValidatorFn => ({
  value,
}: AbstractControl): { [key: string]: any | null } => {
  return value === 0 ? { required: true } : null;
};

const notEnoughBalance = (currentValue: number): ValidatorFn => ({
  value,
}: AbstractControl): { [key: string]: any | null } => {
  return currentValue < value
    ? { message: 'There is not enough balance' }
    : null;
};

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
})
export class MakeTransferComponent implements OnChanges {
  @Input() myAccountAmount: number;
  form: FormGroup;

  get fromField() {
    return this.form.get('from');
  }

  get toField() {
    return this.form.get('to');
  }

  get amountField() {
    return this.form.get('amount');
  }

  dialogOpened = false;

  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private service: TransactionService,
    private createTransaction: CreateTransactionService
  ) {
    this.buildForm();
    this.disableControl('from');
  }

  ngOnChanges({ myAccountAmount }: SimpleChanges): void {
    const myAccountAmountCurrent = myAccountAmount?.currentValue;

    if (!myAccountAmountCurrent || !this.form) return;

    this.setMyAccountInputValue(myAccountAmountCurrent);
    this.setNotEnoughValidatorForAmount(myAccountAmountCurrent);
  }

  submitForm(): void {
    if (!this.form.valid) return;

    this.dialogOpened = true;
  }

  sendTransfer(): void {
    this.dialogOpened = false;
    this.createTransaction.clear();

    const transaction = this.createTransaction
      .addAmount(this.form.value.amount)
      .addTo(this.form.value.to)
      .get();

    this.service.addNewTransaction(transaction);
    this.form.reset(this.getResetvalues());
  }

  closeDialog(): void {
    this.dialogOpened = false;
  }

  private getResetvalues(): { [key: string]: any } {
    const newValues = {
      ...this.form.getRawValue(),
      to: '',
      amount: null,
    };
    return newValues;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      from: [],
      to: ['', Validators.required],
      amount: 0,
    });
  }

  private disableControl(control: string): void {
    this.form.get(control).disable();
  }

  private setMyAccountInputValue(accountMoney: number): void {
    this.fromField.setValue(
      `My Personal Account: ${this.currencyPipe.transform(accountMoney, 'EUR')}`
    );
  }

  private setNotEnoughValidatorForAmount(accountMoney: number) {
    this.amountField.setValidators([
      numberRequired(),
      Validators.min(0),
      notEnoughBalance(accountMoney),
    ]);
  }
}
