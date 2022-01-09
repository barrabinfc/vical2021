import { getPrintable, LooseValidator, makeValidator, pushError } from 'typanion';

export const isSimpleISO8601 = (): LooseValidator<string, string> =>
  makeValidator<string>({
    test: (value, state) => {
      console.log('isSimpleISO8601', value, state);
      if (isNaN(Date.parse(value))) {
        return pushError(state, `Expected to be a valid ISO 8601 date string (got ${getPrintable(value)})`);
      }
      return true;
    }
  });
