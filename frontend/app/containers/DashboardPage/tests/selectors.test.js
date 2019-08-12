import { 
    makeNameSelector,
    makeSurnameSelector,
    makeEmailSelector,
    makeLastPresentLoggedSelector,
    makeLastSuccessfulLoggedSelector,
    makeLastFailedLoggedSelector,
    makeAvailableFundsSelector,
    makeAccountBillsSelector,
    makeAccountBalanceHistorySelector,
    makeSavingsSelector,
    makeRecentTransactionsSenderSelector,
    makeRecentTransactionsRecipientSelector,
    makeOutgoingTransfersSumSelector,
    makeIncomingTransfersSumSelector,
    makeCurrencySelector,
    makeCurrencyIdSelector,
    makeRechartsColorsSelector,
    makeRechartsDataSelector,
    makeErrorSelector,
  } from 'containers/DashboardPage/selectors';
  
  describe('makeNameSelector', () => {
    it('should select the makeNameSelector', () => {
      const nameSelector = makeNameSelector();
      const name = "example";
      const mockedState = {
        dashboardPage: {
            name
        },
      };
      expect(nameSelector(mockedState)).toEqual(name);
    });
  });

  describe('makeSurnameSelector', () => {
    it('should select the makeSurnameSelector', () => {
      const surnameSelector = makeSurnameSelector();
      const surname = "example";
      const mockedState = {
        dashboardPage: {
            surname
        },
      };
      expect(surnameSelector(mockedState)).toEqual(surname);
    });
  });

  describe('makeEmailSelector', () => {
    it('should select the makeEmailSelector', () => {
      const emailSelector = makeEmailSelector();
      const email = "example@example.com";
      const mockedState = {
        dashboardPage: {
            email
        },
      };
      expect(emailSelector(mockedState)).toEqual(email);
    });
  });
  
  describe('makeLastPresentLoggedSelector', () => {
    it('should select the makeLastPresentLoggedSelector', () => {
      const lastPresentLoggedSelector = makeLastPresentLoggedSelector();
      const lastPresentLogged = "2019-02-10 10:02";
      const mockedState = {
        dashboardPage: {
            lastPresentLogged
        },
      };
      expect(lastPresentLoggedSelector(mockedState)).toEqual(lastPresentLogged);
    });
  });

  describe('makeLastSuccessfulLoggedSelector', () => {
    it('should select the makeLastSuccessfulLoggedSelector', () => {
      const lastSuccessfulLoggedSelector = makeLastSuccessfulLoggedSelector();
      const lastSuccessfulLogged = "2019-02-10 10:02";
      const mockedState = {
        dashboardPage: {
            lastSuccessfulLogged
        },
      };
      expect(lastSuccessfulLoggedSelector(mockedState)).toEqual(lastSuccessfulLogged);
    });
  });

  describe('makeLastFailedLoggedSelector', () => {
    it('should select the makeLastFailedLoggedSelector', () => {
      const lastFailedLoggedSelector = makeLastFailedLoggedSelector();
      const lastFailedLogged = "2019-02-10 10:02";
      const mockedState = {
        dashboardPage: {
            lastFailedLogged
        },
      };
      expect(lastFailedLoggedSelector(mockedState)).toEqual(lastFailedLogged);
    });
  });

  describe('makeAvailableFundsSelector', () => {
    it('should select the makeAvailableFundsSelector', () => {
      const availableFundsSelector = makeAvailableFundsSelector();
      const availableFunds = "2,30";
      const mockedState = {
        dashboardPage: {
            availableFunds
        },
      };
      expect(availableFundsSelector(mockedState)).toEqual(availableFunds);
    });
  });

  describe('makeAccountBillsSelector', () => {
    it('should select the makeAccountBillsSelector', () => {
      const accountBillsSelector = makeAccountBillsSelector();
      const accountBills = "NN NNNN NNNN NNNN NNNN NNNN NNNN";
      const mockedState = {
        dashboardPage: {
            accountBills
        },
      };
      expect(accountBillsSelector(mockedState)).toEqual(accountBills);
    });
  });

  describe('makeAccountBalanceHistorySelector', () => {
    it('should select the makeAccountBalanceHistorySelector', () => {
      const accountBalanceHistorySelector = makeAccountBalanceHistorySelector();
      const accountBalanceHistory = "30,20,0";
      const mockedState = {
        dashboardPage: {
            accountBalanceHistory
        },
      };
      expect(accountBalanceHistorySelector(mockedState)).toEqual(accountBalanceHistory);
    });
  });
  
  describe('makeSavingsSelector', () => {
    it('should select the makeSavingsSelector', () => {
      const savingsSelector = makeSavingsSelector();
      const savings = "51,2";
      const mockedState = {
        dashboardPage: {
            savings
        },
      };
      expect(savingsSelector(mockedState)).toEqual(savings);
    });
  });

  describe('makeRecentTransactionsSenderSelector', () => {
    it('should select the makeRecentTransactionsSenderSelector', () => {
      const recentTransactionsSenderSelector = makeRecentTransactionsSenderSelector();
      const recentTransactionsSender = ['test'];
      const mockedState = {
        dashboardPage: {
            recentTransactionsSender
        },
      };
      expect(recentTransactionsSenderSelector(mockedState)).toEqual(recentTransactionsSender);
    });
  });

  describe('makeRecentTransactionsRecipientSelector', () => {
    it('should select the makeRecentTransactionsRecipientSelector', () => {
      const recentTransactionsRecipientSelector = makeRecentTransactionsRecipientSelector();
      const recentTransactionsRecipient = ['test'];
      const mockedState = {
        dashboardPage: {
            recentTransactionsRecipient
        },
      };
      expect(recentTransactionsRecipientSelector(mockedState)).toEqual(recentTransactionsRecipient);
    });
  });

  describe('makeOutgoingTransfersSumSelector', () => {
    it('should select the makeOutgoingTransfersSumSelector', () => {
      const outgoingTransfersSumSelector = makeOutgoingTransfersSumSelector();
      const outgoingTransfersSum = 210.02;
      const mockedState = {
        dashboardPage: {
            outgoingTransfersSum
        },
      };
      expect(outgoingTransfersSumSelector(mockedState)).toEqual(outgoingTransfersSum);
    });
  });

  describe('makeIncomingTransfersSumSelector', () => {
    it('should select the makeIncomingTransfersSumSelector', () => {
      const incomingTransfersSumSelector = makeIncomingTransfersSumSelector();
      const incomingTransfersSum = 210.02;
      const mockedState = {
        dashboardPage: {
            incomingTransfersSum
        },
      };
      expect(incomingTransfersSumSelector(mockedState)).toEqual(incomingTransfersSum);
    });
  });

  describe('makeCurrencySelector', () => {
    it('should select the makeCurrencySelector', () => {
      const currencySelector = makeCurrencySelector();
      const currency = 'PLN';
      const mockedState = {
        dashboardPage: {
            currency
        },
      };
      expect(currencySelector(mockedState)).toEqual(currency);
    });
  });

  describe('makeCurrencyIdSelector', () => {
    it('should select the makeCurrencyIdSelector', () => {
      const currencyIdSelector = makeCurrencyIdSelector();
      const currencyId = 3;
      const mockedState = {
        dashboardPage: {
            currencyId
        },
      };
      expect(currencyIdSelector(mockedState)).toEqual(currencyId);
    });
  });

  describe('makeRechartsColorsSelector', () => {
    it('should select the makeRechartsColorsSelector', () => {
      const rechartsColorsSelector = makeRechartsColorsSelector();
      const rechartsColors = ['#fff'];
      const mockedState = {
        dashboardPage: {
            rechartsColors
        },
      };
      expect(rechartsColorsSelector(mockedState)).toEqual(rechartsColors);
    });
  });

  describe('makeRechartsDataSelector', () => {
    it('should select the makeRechartsDataSelector', () => {
      const rechartsDataSelector = makeRechartsDataSelector();
      const rechartsData = ['12'];
      const mockedState = {
        dashboardPage: {
            rechartsData
        },
      };
      expect(rechartsDataSelector(mockedState)).toEqual(rechartsData);
    });
  });

  describe('makeErrorSelector', () => {
    it('should select the makeErrorSelector', () => {
      const errorSelector = makeErrorSelector();
      const error = 'error';
      const mockedState = {
        dashboardPage: {
            error
        },
      };
      expect(errorSelector(mockedState)).toEqual(error);
    });
  });