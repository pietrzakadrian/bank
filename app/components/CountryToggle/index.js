/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Toggle from 'components/Toggle';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Wrapper from './Wrapper';
import messages from './messages';
import { appLocales } from '../../i18n';

export class CountryToggle extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <Toggle
          value={this.props.country}
          values={appLocales}
          messages={messages}
          onToggle={this.props.onLocaleToggle}
        />
      </Wrapper>
    );
  }
}

CountryToggle.propTypes = {
  onCountryToggle: PropTypes.func,
  country: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), country => ({
  country,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onCountryToggle: evt => dispatch(changeCountryAction(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryToggle);
