import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = {
  copyrightContainer: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 500,
    color: '#cacaca',
    position: 'absolute',
    bottom: 5,
    right: 24,
    marginBottom: -15,
  },
};

function Copyright({ classes }) {
  return (
    <div className={classes.copyrightContainer}>
      &copy; 2019 Adrian Pietrzak.
    </div>
  );
}

Copyright.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Copyright);
