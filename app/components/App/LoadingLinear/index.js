import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  root: {
    flexGrow: 1,

    left: 0,
    right: 0,
    position: 'absolute',

    [theme.breakpoints.down('sm')]: {
      margin: '-17px auto 0',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '-25px auto 0',
    },
  },
});

function LoadingLinear(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
}

LoadingLinear.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingLinear);
