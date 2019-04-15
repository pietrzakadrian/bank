/**
 *
 * CurrencyToggle
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Import Components
import { makeCurrencySelector } from 'containers/RegisterPage/selectors';
import Toggle from './Toggle';
import messages from './messages';
import Wrapper from './Wrapper';
import {
  enterCurrencyAction,
  changeCurrencyAction,
} from '../../containers/RegisterPage/actions';

class CurrencyToggle extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <Toggle
          value={this.props.currencyId}
          values={this.props.currency}
          messages={messages}
          onToggle={this.props.onCurrencyToggle}
        />
      </Wrapper>
    );
  }
}

CurrencyToggle.propTypes = {};

const mapStateToProps = createStructuredSelector({
  currency: makeCurrencySelector(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCurrencyToggle: evt => dispatch(changeCurrencyAction(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyToggle);
