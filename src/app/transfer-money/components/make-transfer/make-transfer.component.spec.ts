import { CurrencyPipe } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionSummary } from '@app/core/models/transaction';
import {
  CustomValidatorsProvider,
} from '@app/core/validators/validators';
import { InputControlComponent } from '@app/shared/components/input/input.component';
import { MoneyInputComponent } from '@app/shared/components/money-input/money-input.component';
import { CreateTransactionService } from '@app/transfer-money/services/create-transaction.service';
import { TransactionService } from '@app/transfer-money/services/transactions.service';
import { MakeTransferComponent } from './make-transfer.component';

describe('MakeTransferComponent', () => {
  let component: MakeTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;

  let currencyPipe: jasmine.SpyObj<CurrencyPipe>;
  let transactionService: jasmine.SpyObj<TransactionService>;
  let createTransactionService: jasmine.SpyObj<CreateTransactionService>;

  const mockCurrencyPipe = jasmine.createSpyObj('CurrencyPipe', ['transform']);
  const mockTransactionService = jasmine.createSpyObj('TransactionService', [
    'addNewTransaction',
  ]);
  const mockCreateTransactionService = jasmine.createSpyObj(
    'CreateTransactionService',
    ['addAmount', 'clear', 'addTo', 'get']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        MakeTransferComponent,
        InputControlComponent,
        MoneyInputComponent,
      ],
      providers: [
        { provide: CurrencyPipe, useValue: mockCurrencyPipe },
        { provide: TransactionService, useValue: mockTransactionService },
        {
          provide: CreateTransactionService,
          useValue: mockCreateTransactionService,
        },
        CustomValidatorsProvider,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferComponent);
    component = fixture.componentInstance;

    currencyPipe = TestBed.inject(CurrencyPipe) as any;
    transactionService = TestBed.inject(TransactionService) as any;
    createTransactionService = TestBed.inject(CreateTransactionService) as any;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('should form be mounted', () => {
      const initialExpectedValues = {
        from: null,
        to: '',
        amount: null,
      };

      const value = component.form.getRawValue();

      expect(value).toEqual(initialExpectedValues);
    });

    it('should from account field be initially disabled', () => {
      expect(component.form.get('from').disabled).toBeTruthy();
    });
  });

  describe('ngOnChanges', () => {
    const changes: SimpleChanges = {
      myAccountAmount: new SimpleChange(undefined, 5000, false),
    };

    beforeEach(() => {
      currencyPipe.transform.calls.reset();
    });

    it('should set my account input value', () => {
      currencyPipe.transform.and.returnValue('$5000');
      component.ngOnChanges(changes);

      const value = component.form.get('from').value;

      expect(value).toBe('My Personal Account: $5000');
    });

    it('should not call currency transform if any new change has ocurred', () => {
      currencyPipe.transform.and.callThrough();

      component.ngOnChanges({ myAccountAmount: undefined });

      expect(currencyPipe.transform).not.toHaveBeenCalled();
    });

    it('should add validators for amount', () => {
      component.ngOnChanges(changes);

      component.form.get('amount').markAsDirty();
      component.amountField.updateValueAndValidity();
      const invalidAmount = component.form.get('amount').invalid;

      expect(invalidAmount).toBeTruthy();
    });
  });

  describe('submitForm', () => {
    it('should not allow submitting if the form is invalid', () => {
      component.submitForm();

      expect(component.dialogOpened).toBeFalsy();
    });

    it('should allow opening review dialog when form is valid', () => {
      component.amountField.setValue(23.4);
      component.toField.setValue('Jhon Smith');
      component.form.updateValueAndValidity();

      component.submitForm();

      expect(component.dialogOpened).toBeTruthy();
    });
  });

  describe('sendTransfer', () => {
    it('should make transaction with the latest valid values', () => {
      createTransactionService.clear.and.returnValue();
      createTransactionService.addAmount.and.returnValue(
        createTransactionService
      );
      createTransactionService.addTo.and.returnValue(createTransactionService);
      createTransactionService.get.and.returnValue({} as TransactionSummary);
      transactionService.addNewTransaction.and.callThrough();

      component.amountField.setValue(10.5);
      component.toField.setValue('JF Kennedy');
      component.myAccountAmount = 5000;

      component.sendTransfer();

      expect(transactionService.addNewTransaction).toHaveBeenCalledWith(
        jasmine.any(Object)
      );
      expect(component.amountField.value).toBe(null);
      expect(component.toField.value).toBe('');
    });
  });

  describe('closeDialog', () => {
    it('should close dialog id this is open once we call this function', () => {
      component.dialogOpened = true;

      component.closeDialog();

      expect(component.dialogOpened).toBeFalsy();
    });
  });
});
