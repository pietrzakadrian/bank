import { fromJS } from 'immutable';
import loginPageReducer from '../reducer';

describe('loginPageReducer', () => {
  it('returns the initial state', () => {
    expect(loginPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
