import makeSelectLoginPage, { makeLoginSelector } from '../selectors';

describe('makeSelectLoginPage', () => {
  it('should select the loginPage state', () => {
    const loginPageState = {
      userData: {},
    };
    const mockedState = {
      loginPage: loginPageState,
    };
    expect(makeSelectLoginPage(mockedState)).toEqual(loginPageState);
  });
});

describe('makeLoginSelector', () => {
  const loginSelector = makeLoginSelector();
  it('should select the login', () => {
    const login = '22';
    const mockedState = {
      loginPage: {
        login,
      },
    };
    expect(loginSelector(mockedState)).toEqual(login);
  });
});
