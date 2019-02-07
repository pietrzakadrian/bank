import { fromJS } from 'immutable';

import languageProviderReducer from '../reducer';
import { CHANGE_LOCALE } from '../constants';

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual(
      fromJS({
        locale: 'pl',
      }),
    );
  });

  it('changes the locale', () => {
    expect(
      languageProviderReducer(undefined, {
        type: CHANGE_LOCALE,
        locale: 'en',
      }).toJS(),
    ).toEqual({
      locale: 'en',
    });
  });
});
