import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { render } from '@testing-library/react';

import { changeCurrencyAction } from 'containers/RegisterPage/actions';
import CurrencyToggle, { mapDispatchToProps } from '../index';

import configureStore from '../../../configureStore';

describe('<CurrencyToggle />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <CurrencyToggle />
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should present the default `en` english language option', () => {
    const { container } = render(
      <Provider store={store}>
        <CurrencyToggle />
      </Provider>,
    );
    expect(container.querySelector('option[value="en"]')).not.toBeNull();
  });

  describe('mapDispatchToProps', () => {
    describe('onLocaleToggle', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLocaleToggle).toBeDefined();
      });

      it('should dispatch changeLocale when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const currency = 1;
        const evt = { target: { value: currency } };
        result.onLocaleToggle(evt);
        expect(dispatch).toHaveBeenCalledWith(changeCurrencyAction(currency));
      });
    });
  });
});
