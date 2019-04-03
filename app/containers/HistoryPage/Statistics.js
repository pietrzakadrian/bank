/**
 *
 * Statistics
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// Import Material-UI
import { withStyles } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  statisticsContainer: {
    padding: 20,
  },
});

function Statistics({ classes }) {
  return (
    <div className={classes.statisticsContainer}>
      <FormattedMessage {...messages.earnings} />: 201 PLN <TrendingUpIcon />
      <FormattedMessage {...messages.expenses} />: 201 PLN <TrendingDownIcon />
    </div>
  );
}

Statistics.propTypes = {};

export default withStyles(styles)(Statistics);
