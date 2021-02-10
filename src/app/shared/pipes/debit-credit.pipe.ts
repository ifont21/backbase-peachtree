import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDebitCredit',
})
export class DebitCreditPipe implements PipeTransform {
  transform(value: number, type: 'CRDT' | 'DBIT') {
    return type === 'DBIT' ? value * -1 : value;
  }
}
