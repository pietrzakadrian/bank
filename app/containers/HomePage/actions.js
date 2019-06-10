/*
 *
 * HomePage actions
 *
 */

import { IS_LOGGED } from './constants';

export function isLoggedAction() {
  return {
    type: IS_LOGGED,
  };
}
