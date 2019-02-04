import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AuthService from '../../services/AuthService';

const styles = {
  greetingHeadlineContainer: {
    textAlign: 'right',
    fontSize: 14,
  },
  greetingHeadlineName: {
    fontWeight: 500,
    color: '#0029ab',
  },
};

class GreetingHeadline extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      surname: '',
      lastPresentLogged: '',
      lastSuccessfulLogged: '',
      isLoading: false,
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.Auth.getUserdata(this.props.id)
      .then(res => {
        if (res) {
          this.setState({
            name: res.user.name,
            surname: res.user.surname,
            lastPresentLogged: res.user.last_present_logged,
            lastSuccessfulLogged: res.user.last_successful_logged,
            isLoading: true,
          });
        }
      })
      .catch(() => {
        /* just ignore */
      });
  }

  render() {
    const { classes } = this.props;
    const {
      name,
      surname,
      lastSuccessfulLogged,
      lastPresentLogged,
      isLoading,
    } = this.state;
    return (
      <Fragment>
        <div
          style={{ opacity: isLoading ? 1 : 0 }}
          className={classes.greetingHeadlineContainer}
        >
          <div>
            Dzień dobry,{' '}
            <span className={classes.greetingHeadlineName}>
              {name} {surname}
            </span>
            <br />
            <span>
              Ostatnie udane logowanie:{' '}
              {lastSuccessfulLogged
                ? [moment(lastSuccessfulLogged).format('DD.MM.YYYY, HH:mm')]
                : [moment(lastPresentLogged).format('DD.MM.YYYY, HH:mm')]}
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

GreetingHeadline.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

export default withStyles(styles)(GreetingHeadline);
