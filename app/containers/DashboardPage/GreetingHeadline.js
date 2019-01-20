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
      last_present_logged: '',
      last_successful_logged: '',
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
            last_present_logged: res.user.last_present_logged,
            last_successful_logged: res.user.last_successful_logged,
            isLoading: true,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const {
      name,
      surname,
      last_successful_logged,
      last_present_logged,
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
              {last_successful_logged
                ? [moment(last_successful_logged).format('DD.MM.YYYY, HH:mm')]
                : [moment(last_present_logged).format('DD.MM.YYYY, HH:mm')]}
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

GreetingHeadline.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GreetingHeadline);
