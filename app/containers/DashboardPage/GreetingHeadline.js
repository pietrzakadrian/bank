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
  },
};

class GreetingHeadline extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      surname: '',
      date_registration: '',
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
            date_registration: res.date_registration,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { name, surname, date_registration } = this.state;
    return (
      <Fragment>
        <div className={classes.GreetingHeadlineContainer}>
          <div>
            Dzień dobry{' '}
            <span className={classes.GreetingHeadlineName}>
              {name} {surname}
            </span>
            <br />
            <span>
              Ostatnie logowanie:{' '}
              {moment(date_registration).format('DD.MM.YYYY, H:mm')}
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
