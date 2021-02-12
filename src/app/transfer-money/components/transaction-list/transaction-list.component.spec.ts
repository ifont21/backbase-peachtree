import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterTransactionService } from '@app/transfer-money/services/filter-transaction.service';
import { TransactionListComponent } from './transaction-list.component';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let filterService: jasmine.SpyObj<FilterTransactionService>;

  const mockFilterService = jasmine.createSpyObj('FilterTransactionService', [
    'filter',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionListComponent],
      providers: [
        { provide: FilterTransactionService, useValue: mockFilterService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterTransactionService) as any;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('onFilter', () => {
    it('should make a filter with a search term', () => {
      filterService.filter.and.callThrough();
      const searchTerm = 'Amazon';

      component.onFilter(searchTerm);

      expect(filterService.filter).toHaveBeenCalledWith(searchTerm);
    });
  });
});
