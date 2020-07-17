import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider, defineMessages } from 'react-intl';

import Toggle from '../Toggle';

describe('<Toggle />', () => {
  it('should contain default text', () => {
    const defaultEnMessage = 'someContent';
    const defaultDeMessage = 'someOtherContent';
    const messages = defineMessages({
      en: {
        id: 'boilerplate.containers.LocaleToggle.en',
        defaultMessage: defaultEnMessage,
      },
      de: {
        id: 'boilerplate.containers.LocaleToggle.en',
        defaultMessage: defaultDeMessage,
      },
    });
    const { container } = render(
      <IntlProvider locale="en">
        <Toggle values={['en', 'de']} messages={messages} />
      </IntlProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
