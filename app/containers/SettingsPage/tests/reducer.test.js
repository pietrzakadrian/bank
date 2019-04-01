import { fromJS } from 'immutable';
import settingsPageReducer from '../reducer';

describe('settingsPageReducer', () => {
  it('returns the initial state', () => {
    expect(settingsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
