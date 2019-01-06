import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

// Import Components
import Loading from 'components/App/Loading/Loading';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AuthService from '../../services/AuthService';

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
      isLoading: false,
      availableFunds: [],
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.Auth.availableFunds(this.props.id)
      .then(res => {
        if (res) {
          this.setState({
            isLoading: true,
            availableFunds: res.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.available_funds,
              0,
            ),
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { isLoading, availableFunds } = this.state;

    return (
      // TODO: add graph component
      <Paper className={classes.root} elevation={1}>
        {isLoading ? (
          <Fragment>
            <div>
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
            </div>
          </Fragment>
        ) : (
          <div className={classes.loadingCircular}>
            <Loading />
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
