/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { LOGGED_IN, LOGGED_OUT } from './constants';

export const initialState = {
  isLogged: false,
  userId: null,
  token: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGGED_IN:
        draft.isLogged = true;
        draft.userId = action.userId;
        draft.token = action.token;
        break;
      case LOGGED_OUT:
        draft.isLogged = false;
        draft.userId = '';
        draft.token = '';
        break;
    }
  });

export default loginPageReducer;
