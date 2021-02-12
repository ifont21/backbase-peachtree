import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDebitCredit',
})
export class DebitCreditPipe implements PipeTransform {
  transform(value: string, type: 'CRDT' | 'DBIT'): string {
    return type === 'DBIT' ? this.setMinusOnValue(value, type) : value;
  }

  private setMinusOnValue(value: string, type: 'CRDT' | 'DBIT'): string {
    const numericValue = value.substr(1, value.length - 1);
    const symbol = value.substr(0, 1);
    const finalValue = `${symbol} -${numericValue}`;
    return finalValue;
  }
}
