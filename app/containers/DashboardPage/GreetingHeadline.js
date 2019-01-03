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
      last_logged: '',
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.Auth.GreetingHeadline(this.props.id)
      .then(res => {
        if (res) {
          this.setState({
            name: res.name,
            surname: res.surname,
            last_logged: res.last_logged,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { name, surname, last_logged } = this.state;
    return (
      <Fragment>
        <div className={classes.GreetingHeadlineContainer}>
          <span>
            Dzień dobry{' '}
            <span className={classes.GreetingHeadlineName}>
              {name} {surname}
            </span>
          </span>
          <br />
          <span>
            Ostatnie logowanie: {moment(last_logged).format('D.MM.YYYY, H:mm')}
          </span>
        </div>
      </Fragment>
    );
  }
}

GreetingHeadline.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GreetingHeadline);
