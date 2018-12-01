import React from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 95,
    boxShadow: 'none',
    border: '1.3px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 0,
    backgroundColor: '#f3f3f3',
  },
});

function BankInformation({ classes }) {
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="subtitle2">
        Informacja o naszym wspaniałym banku
      </Typography>
    </Paper>
  );
}

BankInformation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BankInformation);
