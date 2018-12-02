/*
 *
 * LanguageToggle
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Toggle from './Toggle';
import messages from './messages';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';

class LocaleToggle extends Component {
  state = {};

  render() {
    return (
      <Toggle
        value={this.props.locale}
        values={appLocales}
        messages={messages}
        onToggle={this.props.onLocaleToggle}
      />
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
