/**
 *
 * CurrencyToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './styles.css';

// Import Components
import { makeCurrencySelector } from 'containers/SettingsPage/selectors';
import { changeNewCurrencyAction } from 'containers/SettingsPage/actions';
import Toggle from './Toggle';
import messages from './messages';

class CurrencyToggle extends React.PureComponent {
  render() {
    return (
      <Toggle
        value={this.props.currencyId}
        values={this.props.currency}
        messages={messages}
        onToggle={this.props.onCurrencyToggle}
      />
    );
  }
}

CurrencyToggle.propTypes = {
  currencyId: PropTypes.number,
  currency: PropTypes.array,
  onCurrencyToggle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currency: makeCurrencySelector(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCurrencyToggle: evt =>
      dispatch(changeNewCurrencyAction(parseInt(evt.target.value, 10))),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyToggle);
