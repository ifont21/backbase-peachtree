export interface Dates {
  valueDate: number | string;
}

export interface AmountCurrency {
  amount: number | string;
  currencyCode: string;
}

export interface Transaction {
  amountCurrency: AmountCurrency;
  type: string;
  creditDebitIndicator: string;
}

export interface Merchant {
  name: string;
  accountNumber: string;
}

export interface TransactionSummary {
  id?: string;
  categoryCode: string;
  dates: Dates;
  transaction: Transaction;
  merchant: Merchant;
}
