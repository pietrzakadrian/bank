import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import SettingsPage from '../index';
import messages from '../messages';

describe('<SettingsPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<SettingsPage />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.header} />),
    ).toEqual(true);
  });
});
