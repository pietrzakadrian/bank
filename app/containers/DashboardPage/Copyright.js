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
  },
  copyrightHref: {
    textDecoration: 'none',
    color: '#cacaca',
    fontWeight: 550,
  },
};

function Copyright({ classes }) {
  return (
    <div className={classes.copyrightContainer}>
      &copy; 2019{' '}
      <a
        href="https://www.linkedin.com/in/pietrzakadrian/"
        target="_blank"
        className={classes.copyrightHref}
      >
        Adrian Pietrzak
      </a>
      .
    </div>
  );
}

Copyright.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Copyright);
