import React from 'react';
import { shallow } from 'enzyme';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from '../../../global-styles';

import App from '../index';

describe('<App />', () => {
  it('should render some routes', () => {
    const renderedComponent = shallow(<App />);
    expect(renderedComponent.find(Route)).not.toHaveLength(0);
  });

  it('should render the Switch', () => {
    const renderedComponent = shallow(<App />);
    expect(renderedComponent.find(Switch)).toHaveLength(2);
  });

  it('should render GlobalStyle', () => {
    const renderedComponent = shallow(<App />);
    expect(renderedComponent.find(GlobalStyle)).toHaveLength(1);
  });
});
