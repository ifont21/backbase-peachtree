import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class FilterTransactionService {
  private searchTerm$ = new BehaviorSubject<string>('');

  searchTerm$$ = this.searchTerm$
    .asObservable()
    .pipe(debounceTime(50), distinctUntilChanged());

  filter(term: string): void {
    this.searchTerm$.next(term);
  }
}
