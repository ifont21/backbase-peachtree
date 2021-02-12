import { DebitCreditPipe } from './debit-credit.pipe';

describe('DebitCreditPipe', () => {
  let pipe: DebitCreditPipe;

  beforeEach(() => {
    pipe = new DebitCreditPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should transform the character with the minus sign in between', () => {
      const str = pipe.transform('€5000', 'DBIT');

      expect(str).toBe('€ -5000');
    });

    it('should not transform the character if it is just Credit', () => {
      const str = pipe.transform('€5000', 'CRDT');

      expect(str).toBe('€5000');
    });
  });
});
