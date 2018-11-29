import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import LoginPage from '../index';
import messages from '../messages';

describe('<LoginPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<LoginPage />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.header} />),
    ).toEqual(true);
  });
});
