import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Import Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

// Import Components
import LoadingCircular from 'components/LoadingCircular';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Import Styles
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
  typographyMain: {
    display: 'inline-block',
  },
  loadingCircular: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
  },
});

class AvailableFunds extends Component {
  constructor() {
    super();
    this.state = {
      availableFunds: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/bills/1')
      .then(response => response.json())
      .then(json => this.setState({ availableFunds: json.available_funds }));
  }

  render() {
    const { classes } = this.props;
    const { availableFunds } = this.state;

    return (
      <Paper className={classes.root} elevation={1}>
        {availableFunds ? (
          <Fragment>
            <Typography variant="subtitle1">
              <FormattedMessage {...messages.availableFunds} />
            </Typography>
            <Typography variant="h5">
              {availableFunds}
              &nbsp;
              <Typography
                variant="subtitle1"
                className={classes.typographyMain}
              >
                PLN
              </Typography>
            </Typography>
          </Fragment>
        ) : (
          <div className={classes.loadingCircular}>
            <LoadingCircular />
          </div>
        )}
      </Paper>
    );
  }
}

AvailableFunds.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AvailableFunds);
