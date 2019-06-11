/**
 *
 * Notifier
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Notifier() {
  return null;
}

Notifier.propTypes = {};

const mapStateToProps = createStructuredSelector({
  login: makeLoginSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(memo(Notifier));
