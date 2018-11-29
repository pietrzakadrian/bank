import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import DashboardPage from '../index';
import messages from '../messages';

describe('<DashboardPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<DashboardPage />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.header} />),
    ).toEqual(true);
  });
});
