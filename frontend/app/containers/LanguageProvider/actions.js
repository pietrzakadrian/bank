/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE } from './constants';

/**
 * Change the language on the client side,
 *
 * @param  {string} languageLocale The language locale
 *
 * @return {object} An action object with a type of CHANGE_LOCALE
 */
export function changeLocaleAction(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
