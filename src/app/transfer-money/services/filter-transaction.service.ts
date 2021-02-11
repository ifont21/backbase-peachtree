import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class FilterTransactionService {
  private searchTerm$ = new BehaviorSubject<string>('');
  private readonly filterDebounceTime = 500;

  searchTerm$$ = this.searchTerm$
    .asObservable()
    .pipe(debounceTime(this.filterDebounceTime), distinctUntilChanged());

  filter(term: string): void {
    this.searchTerm$.next(term);
  }
}
