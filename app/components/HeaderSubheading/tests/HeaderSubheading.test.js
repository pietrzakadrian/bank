import React from 'react';
import { shallow } from 'enzyme';
import HeaderSubheading from '../HeaderSubheading';

describe('<Header />', () => {
  const headerText = 'Dashboard';

  it('renders without crashing', () => {
    shallow(<HeaderSubheading headerText={headerText} />);
  });
});
