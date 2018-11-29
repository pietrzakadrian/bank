import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import RegisterPage from '../index';
import messages from '../messages';

describe('<RegisterPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<RegisterPage />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.header} />),
    ).toEqual(true);
  });
});
