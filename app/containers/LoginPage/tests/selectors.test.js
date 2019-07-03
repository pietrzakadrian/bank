import { makeLoginSelector } from '../selectors';

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
