import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import decode from 'jwt-decode';

// Import Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

// Import Components
import LoadingCircular from 'components/LoadingCircular';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import { userdata } from '../../services/UserService';
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
      id: '',
      token: '',
      available_funds: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    // const token = localStorage.getItem('userToken');
    // const decoded = decode(token);

    // this.setState({
    //   id: decoded.id,
    //   token: localStorage.getItem('userToken'),
    // });

    // userdata(this.state.token, this.state.id).then(res => {
    //   if (res) {
    //     this.setState({
    //       isLoading: false,
    //       available_funds: res.data.available_funds,
    //     });
    //   }
    // });

    axios
      .get('http://localhost:3000/api/bills/1')
      .then(({ data }) => {
        this.setState({
          availableFunds: data.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.available_funds,
            0,
          ),
        });
      })
      .catch(err => {});
  }

  render() {
    const { classes } = this.props;
    const { isLoading, available_funds } = this.state;

    return (
      <Paper className={classes.root} elevation={1}>
        {!isLoading ? (
          <Fragment>
            <Typography variant="subtitle1">
              <FormattedMessage {...messages.availableFunds} />
            </Typography>
            <Typography variant="h5">
              {available_funds}
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
