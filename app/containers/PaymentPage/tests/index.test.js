import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import PaymentPage from '../index';
import messages from '../messages';

describe('<PaymentPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<PaymentPage />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.header} />),
    ).toEqual(true);
  });
});
