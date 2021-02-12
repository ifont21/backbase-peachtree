import { CurrencyPipe } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CustomValidators,
  CustomValidatorsProvider,
  CUSTOM_VALIDATORS,
} from '@app/core/validators/validators';
import { CreateTransactionService } from '@app/transfer-money/services/create-transaction.service';
import { TransactionService } from '@app/transfer-money/services/transactions.service';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
  providers: [CustomValidatorsProvider],
})
export class MakeTransferComponent implements OnChanges {
  @Input() myAccountAmount: number;

  form: FormGroup;

  get fromField(): AbstractControl {
    return this.form.get('from');
  }

  get toField(): AbstractControl {
    return this.form.get('to');
  }

  get amountField(): AbstractControl {
    return this.form.get('amount');
  }

  dialogOpened = false;

  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private service: TransactionService,
    private createTransaction: CreateTransactionService,
    @Inject(CUSTOM_VALIDATORS) private customValidators: CustomValidators
  ) {
    this.buildForm();
    this.disableControl('from');
  }

  ngOnChanges({ myAccountAmount }: SimpleChanges): void {
    const myAccountAmountCurrent = myAccountAmount?.currentValue;

    if (!myAccountAmountCurrent || !this.form) return;

    this.setMyAccountInputValue(myAccountAmountCurrent);
    this.setAmountValidators(myAccountAmountCurrent);
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
      amount: null,
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

  private setAmountValidators(accountMoney: number): void {
    this.amountField.setValidators([
      this.customValidators().numberRequired(),
      Validators.min(0),
      this.customValidators().notEnoughBalance(accountMoney),
    ]);
  }
}
