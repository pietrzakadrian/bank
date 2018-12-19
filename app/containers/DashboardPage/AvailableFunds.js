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
import AuthService from '../../services/AuthService';
import withAuth from '../../services/withAuth';
const Auth = new AuthService();

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
      availableFunds: '',
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.Auth.availableFunds(this.props.id)
      .then(res => {
        if (res) {
          // TODO: data.reduce
          this.setState({
            isLoading: true,
            availableFunds: res,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    //   axios
    //     .get('http://localhost:3000/api/bills/1')
    //     .then(({ data }) => {
    //       this.setState({
    //         availableFunds: data.reduce(
    //           (accumulator, currentValue) =>
    //             accumulator + currentValue.available_funds,
    //           0,
    //         ),
    //       });
    //     })
    //     .catch(err => {});
  }

  render() {
    const { classes } = this.props;
    const { isLoading, availableFunds } = this.state;

    console.log('availableFunds', availableFunds);

    return (
      <Paper className={classes.root} elevation={1}>
        {isLoading ? (
          <Fragment>
            <Typography variant="subtitle1">
              <FormattedMessage {...messages.availableFunds} />
            </Typography>
            <Typography variant="h5">
              {availableFunds.map(aF => (
                <span key={aF.available_funds}>{aF.available_funds}</span>
              ))}
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
