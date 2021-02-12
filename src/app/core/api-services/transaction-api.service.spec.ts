import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TransactionApiService } from './transaction-api.service';

describe('TransactionApiService', () => {
  let service: TransactionApiService;
  let http: jasmine.SpyObj<HttpClient>;

  const mockHttp = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionApiService,
        {
          provide: HttpClient,
          useValue: mockHttp,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(TransactionApiService);
    http = TestBed.inject(HttpClient) as any;
  });

  it('should be instantiated', () => {
    expect(service).toBeTruthy();
  });

  describe('getTransactions', () => {
    it('should get transactions using the correct endpoint', fakeAsync(() => {
      http.get.and.returnValue(of([]));

      service.getTransactions().subscribe();

      tick();

      expect(http.get).toHaveBeenCalledWith(
        jasmine.stringMatching(/\/transactions$/)
      );
    }));

    it('should get transactions by a mock data when the current endpoint fails', fakeAsync(() => {
      http.get.and.returnValue(throwError({ status: 500 }));
      let transactionLength = 0;

      service.getTransactions().subscribe((transactions) => {
        transactionLength = transactions.length;
      });

      tick();

      expect(transactionLength > 0).toBeTruthy();
    }));
  });
});
