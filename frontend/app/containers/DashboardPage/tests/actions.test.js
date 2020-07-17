import {
    GET_NAME,
    GET_NAME_SUCCESS,
    GET_NAME_ERROR,
    GET_SURNAME,
    GET_SURNAME_SUCCESS,
    GET_SURNAME_ERROR,
    GET_EMAIL,
    GET_EMAIL_SUCCESS,
    GET_EMAIL_ERROR,
    GET_LAST_PRESENT_LOGGED,
    GET_LAST_PRESENT_LOGGED_SUCCESS,
    GET_LAST_PRESENT_LOGGED_ERROR,
    GET_LAST_SUCCESSFUL_LOGGED,
    GET_LAST_SUCCESSFUL_LOGGED_SUCCESS,
    GET_LAST_SUCCESSFUL_LOGGED_ERROR,
    GET_LAST_FAILED_LOGGED,
    GET_LAST_FAILED_LOGGED_SUCCESS,
    GET_LAST_FAILED_LOGGED_ERROR,
    GET_AVAILABLE_FUNDS,
    GET_AVAILABLE_FUNDS_SUCCESS,
    GET_AVAILABLE_FUNDS_ERROR,
    GET_ACCOUNT_BILLS,
    GET_ACCOUNT_BILLS_SUCCESS,
    GET_ACCOUNT_BILLS_ERROR,
    GET_ACCOUNT_BALANCE_HISTORY,
    GET_ACCOUNT_BALANCE_HISTORY_SUCCESS,
    GET_ACCOUNT_BALANCE_HISTORY_ERROR,
    GET_SAVINGS,
    GET_SAVINGS_SUCCESS,
    GET_RECENT_TRANSACTIONS_SENDER,
    GET_RECENT_TRANSACTIONS_SENDER_SUCCESS,
    GET_RECENT_TRANSACTIONS_SENDER_ERROR,
    GET_RECENT_TRANSACTIONS_RECIPIENT,
    GET_RECENT_TRANSACTIONS_RECIPIENT_SUCCESS,
    GET_RECENT_TRANSACTIONS_RECIPIENT_ERROR,
    GET_OUTGOING_TRANSFERS_SUM,
    GET_OUTGOING_TRANSFERS_SUM_SUCCESS,
    GET_OUTGOING_TRANSFERS_SUM_ERROR,
    GET_INCOMING_TRANSFERS_SUM,
    GET_INCOMING_TRANSFERS_SUM_SUCCESS,
    GET_INCOMING_TRANSFERS_SUM_ERROR,
    GET_CURRENCY,
    GET_CURRENCY_SUCCESS,
    GET_CURRENCY_ERROR,
    GET_CURRENCY_ID,
    GET_CURRENCY_ID_SUCCESS,
    GET_CURRENCY_ID_ERROR,
    GET_RECHARTS_DATA,
    GET_RECHARTS_DATA_SUCCESS,
    GET_RECHARTS_COLORS,
    GET_RECHARTS_COLORS_SUCCESS,
    GET_RECHARTS_COLORS_ERROR,
  } from '../constants';

import {
    getNameAction,
    getNameSuccessAction,
    getNameErrorAction,
    getSurnameAction,
    getSurnameSuccessAction,
    getSurnameErrorAction,
    getEmailAction,
    getEmailSuccessAction,
    getEmailErrorAction,
    getCurrencyAction,
    getCurrencySuccessAction,
    getCurrencyErrorAction,
    getCurrencyIdAction,
    getCurrencyIdSuccessAction,
    getCurrencyIdErrorAction,
    getLastPresentLoggedAction,
    getLastPresentLoggedSuccessAction,
    getLastPresentLoggedErrorAction,
    getLastSuccessfulLoggedAction,
    getLastSuccessfulLoggedSuccessAction,
    getLastSuccessfulLoggedErrorAction,
    getLastFailedLoggedAction,
    getLastFailedLoggedSuccessAction,
    getLastFailedLoggedErrorAction,
    getAvailableFundsAction,
    getAvailableFundsSuccessAction,
    getAvailableFundsErrorAction,
    getAccountBillsAction,
    getAccountBillsSuccessAction,
    getAccountBillsErrorAction,
    getSavingsAction,
    getSavingsSuccessAction,
    getAccountBalanceHistoryAction,
    getAccountBalanceHistorySuccessAction,
    getAccountBalanceHistoryErrorAction,
    getRecentTransactionsSenderAction,
    getRecentTransactionsSenderSuccessAction,
    getRecentTransactionsSenderErrorAction,
    getRecentTransactionsRecipientAction,
    getRecentTransactionsRecipientSuccessAction,
    getRecentTransactionsRecipientErrorAction,
    getIncomingTransfersSumAction,
    getIncomingTransfersSumSuccessAction,
    getIncomingTransfersSumErrorAction,
    getOutgoingTransfersSumAction,
    getOutgoingTransfersSumSuccessAction,
    getOutgoingTransfersSumErrorAction,
    getRechartsDataAction,
    getRechartsDataSuccessAction,
    getRechartsColorsAction,
    getRechartsColorsSuccessAction,
    getRechartsColorsErrorAction
} from '../actions';


describe('Dashboard Actions', () => {
    describe('getNameAction', () => {
      it('should return the correct type', () => {
        const expectedResult = {
          type: GET_NAME,
        };
  
        expect(getNameAction()).toEqual(expectedResult);
      });
    });

      describe('getNameSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const name = "test";
          const expectedResult = {
            type: GET_NAME_SUCCESS,
            name,
          };
    
          expect(getNameSuccessAction(name)).toEqual(expectedResult);
        });
      });
    
      describe('getNameErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_NAME_ERROR,
            error,
          };
    
          expect(getNameErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getSurnameAction', () => {
        it('should return the correct type', () => {
          const error = "error";
          const expectedResult = {
            type: GET_SURNAME,
          };
    
          expect(getSurnameAction(error)).toEqual(expectedResult);
        });
      });

      describe('getSurnameSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const surname = "test";
          const expectedResult = {
            type: GET_SURNAME_SUCCESS,
            surname,
          };
    
          expect(getSurnameSuccessAction(surname)).toEqual(expectedResult);
        });
      });
    
      describe('getSurnameErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_SURNAME_ERROR,
            error,
          };
    
          expect(getSurnameErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getEmailAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_EMAIL,
          };
    
          expect(getEmailAction()).toEqual(expectedResult);
        });
      });

      describe('getEmailSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const email = "test";
          const expectedResult = {
            type: GET_EMAIL_SUCCESS,
            email,
          };
    
          expect(getEmailSuccessAction(email)).toEqual(expectedResult);
        });
      });
    
      describe('getEmailErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_EMAIL_ERROR,
            error,
          };
    
          expect(getEmailErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getCurrencyAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_CURRENCY,
          };
    
          expect(getCurrencyAction()).toEqual(expectedResult);
        });
      });

      describe('getCurrencySuccessAction', () => {
        it('should return the correct type and the data', () => {
          const currency = "PLN";
          const expectedResult = {
            type: GET_CURRENCY_SUCCESS,
            currency,
          };
    
          expect(getCurrencySuccessAction(currency)).toEqual(expectedResult);
        });
      });
    
      describe('getCurrencyErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_CURRENCY_ERROR,
            error,
          };
    
          expect(getCurrencyErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getCurrencyIdAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_CURRENCY_ID,
          };
    
          expect(getCurrencyIdAction()).toEqual(expectedResult);
        });
      });

      describe('getCurrencyIdSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const currencyId = 2;
          const expectedResult = {
            type: GET_CURRENCY_ID_SUCCESS,
            currencyId,
          };
    
          expect(getCurrencyIdSuccessAction(currencyId)).toEqual(expectedResult);
        });
      });
    
      describe('getCurrencyIdErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_CURRENCY_ID_ERROR,
            error,
          };
    
          expect(getCurrencyIdErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getLastPresentLoggedAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_LAST_PRESENT_LOGGED,
          };
    
          expect(getLastPresentLoggedAction()).toEqual(expectedResult);
        });
      });

      describe('getLastPresentLoggedSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const lastPresentLogged = "test";
          const expectedResult = {
            type: GET_LAST_PRESENT_LOGGED_SUCCESS,
            lastPresentLogged,
          };
    
          expect(getLastPresentLoggedSuccessAction(lastPresentLogged)).toEqual(expectedResult);
        });
      });
    
      describe('getLastPresentLoggedErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_LAST_PRESENT_LOGGED_ERROR,
            error,
          };
    
          expect(getLastPresentLoggedErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getLastSuccessfulLoggedAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_LAST_SUCCESSFUL_LOGGED,
          };
    
          expect(getLastSuccessfulLoggedAction()).toEqual(expectedResult);
        });
      });

      describe('getLastSuccessfulLoggedSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const lastSuccessfulLogged = "test";
          const expectedResult = {
            type: GET_LAST_SUCCESSFUL_LOGGED_SUCCESS,
            lastSuccessfulLogged,
          };
    
          expect(getLastSuccessfulLoggedSuccessAction(lastSuccessfulLogged)).toEqual(expectedResult);
        });
      });
    
      describe('getLastSuccessfulLoggedErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_LAST_SUCCESSFUL_LOGGED_ERROR,
            error,
          };
    
          expect(getLastSuccessfulLoggedErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getLastFailedLoggedAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_LAST_FAILED_LOGGED,
          };
    
          expect(getLastFailedLoggedAction()).toEqual(expectedResult);
        });
      });

      describe('getLastFailedLoggedSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const lastFailedLogged = "test";
          const expectedResult = {
            type: GET_LAST_FAILED_LOGGED_SUCCESS,
            lastFailedLogged,
          };
    
          expect(getLastFailedLoggedSuccessAction(lastFailedLogged)).toEqual(expectedResult);
        });
      });
    
      describe('getLastFailedLoggedErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_LAST_FAILED_LOGGED_ERROR,
            error,
          };
    
          expect(getLastFailedLoggedErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getAvailableFundsAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_AVAILABLE_FUNDS,
          };
    
          expect(getAvailableFundsAction()).toEqual(expectedResult);
        });
      });
    
      describe('getAvailableFundsSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const availableFunds = "13,20 PLN";
          const expectedResult = {
            type: GET_AVAILABLE_FUNDS_SUCCESS,
            availableFunds,
          };
    
          expect(getAvailableFundsSuccessAction(availableFunds)).toEqual(expectedResult);
        });
      });

      describe('getAvailableFundsErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_AVAILABLE_FUNDS_ERROR,
            error,
          };
    
          expect(getAvailableFundsErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getAccountBillsAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_ACCOUNT_BILLS,
          };
    
          expect(getAccountBillsAction()).toEqual(expectedResult);
        });
      });
    
      describe('getAccountBillsSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const accountBills = "00313131";
          const expectedResult = {
            type: GET_ACCOUNT_BILLS_SUCCESS,
            accountBills,
          };
    
          expect(getAccountBillsSuccessAction(accountBills)).toEqual(expectedResult);
        });
      });

      describe('getAccountBillsErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_ACCOUNT_BILLS_ERROR,
            error,
          };
    
          expect(getAccountBillsErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getSavingsAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_SAVINGS,
          };
    
          expect(getSavingsAction()).toEqual(expectedResult);
        });
      });
    
      describe('getSavingsSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const savings = "00313131";
          const expectedResult = {
            type: GET_SAVINGS_SUCCESS,
            savings,
          };
    
          expect(getSavingsSuccessAction(savings)).toEqual(expectedResult);
        });
      });

      describe('getAccountBalanceHistoryAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_ACCOUNT_BALANCE_HISTORY,
          };
    
          expect(getAccountBalanceHistoryAction()).toEqual(expectedResult);
        });
      });
    
      describe('getAccountBalanceHistorySuccessAction', () => {
        it('should return the correct type and the data', () => {
          const accountBalanceHistory = ["test"];
          const expectedResult = {
            type: GET_ACCOUNT_BALANCE_HISTORY_SUCCESS,
            accountBalanceHistory,
          };
    
          expect(getAccountBalanceHistorySuccessAction(accountBalanceHistory)).toEqual(expectedResult);
        });
      });

      describe('getAccountBalanceHistoryErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_ACCOUNT_BALANCE_HISTORY_ERROR,
            error,
          };
    
          expect(getAccountBalanceHistoryErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getRecentTransactionsSenderAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_RECENT_TRANSACTIONS_SENDER,
          };
    
          expect(getRecentTransactionsSenderAction()).toEqual(expectedResult);
        });
      });
    
      describe('getRecentTransactionsSenderSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const recentTransactionsSender = ["test"];
          const expectedResult = {
            type: GET_RECENT_TRANSACTIONS_SENDER_SUCCESS,
            recentTransactionsSender,
          };
    
          expect(getRecentTransactionsSenderSuccessAction(recentTransactionsSender)).toEqual(expectedResult);
        });
      });

      describe('getRecentTransactionsSenderErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_RECENT_TRANSACTIONS_SENDER_ERROR,
            error,
          };
    
          expect(getRecentTransactionsSenderErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getRecentTransactionsRecipientAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_RECENT_TRANSACTIONS_RECIPIENT,
          };
    
          expect(getRecentTransactionsRecipientAction()).toEqual(expectedResult);
        });
      });
    
      describe('getRecentTransactionsRecipientSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const recentTransactionsRecipient = ["test"];
          const expectedResult = {
            type: GET_RECENT_TRANSACTIONS_RECIPIENT_SUCCESS,
            recentTransactionsRecipient,
          };
    
          expect(getRecentTransactionsRecipientSuccessAction(recentTransactionsRecipient)).toEqual(expectedResult);
        });
      });

      describe('getRecentTransactionsRecipientErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_RECENT_TRANSACTIONS_RECIPIENT_ERROR,
            error,
          };
    
          expect(getRecentTransactionsRecipientErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getIncomingTransfersSumAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_INCOMING_TRANSFERS_SUM,
          };
    
          expect(getIncomingTransfersSumAction()).toEqual(expectedResult);
        });
      });
    
      describe('getIncomingTransfersSumSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const incomingTransfersSum = 12;
          const expectedResult = {
            type: GET_INCOMING_TRANSFERS_SUM_SUCCESS,
            incomingTransfersSum,
          };
    
          expect(getIncomingTransfersSumSuccessAction(incomingTransfersSum)).toEqual(expectedResult);
        });
      });

      describe('getIncomingTransfersSumErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_INCOMING_TRANSFERS_SUM_ERROR,
            error,
          };
    
          expect(getIncomingTransfersSumErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getOutgoingTransfersSumAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_OUTGOING_TRANSFERS_SUM,
          };
    
          expect(getOutgoingTransfersSumAction()).toEqual(expectedResult);
        });
      });
    
      describe('getOutgoingTransfersSumSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const outgoingTransfersSum = 12;
          const expectedResult = {
            type: GET_OUTGOING_TRANSFERS_SUM_SUCCESS,
            outgoingTransfersSum,
          };
    
          expect(getOutgoingTransfersSumSuccessAction(outgoingTransfersSum)).toEqual(expectedResult);
        });
      });

      describe('getOutgoingTransfersSumErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_OUTGOING_TRANSFERS_SUM_ERROR,
            error,
          };
    
          expect(getOutgoingTransfersSumErrorAction(error)).toEqual(expectedResult);
        });
      });

      describe('getRechartsDataAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_RECHARTS_DATA,
          };
    
          expect(getRechartsDataAction()).toEqual(expectedResult);
        });
      });
    
      describe('getRechartsDataSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const rechartsData = ["test"];
          const expectedResult = {
            type: GET_RECHARTS_DATA_SUCCESS,
            rechartsData,
          };
    
          expect(getRechartsDataSuccessAction(rechartsData)).toEqual(expectedResult);
        });
      });

      describe('getRechartsColorsAction', () => {
        it('should return the correct type', () => {
          const expectedResult = {
            type: GET_RECHARTS_COLORS,
          };
    
          expect(getRechartsColorsAction()).toEqual(expectedResult);
        });
      });
    
      describe('getRechartsColorsSuccessAction', () => {
        it('should return the correct type and the data', () => {
          const rechartsColors = ["test"];
          const expectedResult = {
            type: GET_RECHARTS_COLORS_SUCCESS,
            rechartsColors,
          };
    
          expect(getRechartsColorsSuccessAction(rechartsColors)).toEqual(expectedResult);
        });
      });

      describe('getRechartsColorsErrorAction', () => {
        it('should return the correct type and the error', () => {
          const error = "error";
          const expectedResult = {
            type: GET_RECHARTS_COLORS_ERROR,
            error,
          };
    
          expect(getRechartsColorsErrorAction(error)).toEqual(expectedResult);
        });
      });
});