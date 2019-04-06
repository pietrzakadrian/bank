import React from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// Import Styles
const styles = () => ({
  progress: {
    margin: 'auto',
  },
});

function LoadingCircular(props) {
  const { classes } = props;
  return <CircularProgress className={classes.progress} />;
}

LoadingCircular.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingCircular);
