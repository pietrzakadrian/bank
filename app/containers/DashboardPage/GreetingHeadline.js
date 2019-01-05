import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AuthService from '../../services/AuthService';

const styles = {
  GreetingHeadlineContainer: {
    textAlign: 'right',
    fontSize: 14,
    paddingBottom: 10,
  },
  GreetingHeadlineName: {
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
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.Auth.greetingHeadline(this.props.id)
      .then(res => {
        if (res) {
          this.setState({
            name: res.name,
            surname: res.surname,
            last_present_logged: res.last_present_logged,
            last_successful_logged: res.last_successful_logged,
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
    } = this.state;
    return (
      <Fragment>
        <div className={classes.GreetingHeadlineContainer}>
          <div>
            Dzień dobry,{' '}
            <span className={classes.GreetingHeadlineName}>
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
