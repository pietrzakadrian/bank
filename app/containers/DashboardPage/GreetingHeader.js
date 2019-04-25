/* eslint-disable indent */
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Import Material UI
import { withStyles } from '@material-ui/core';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  makeNameSelector,
  makeSurnameSelector,
  makeLastSuccessfulLoggedSelector,
  makeLastPresentLoggedSelector,
} from './selectors';
import {
  getNameAction,
  getSurnameAction,
  getLastPresentLoggedAction,
  getLastSuccessfulLoggedAction,
} from './actions';

const styles = {
  greetingHeadlineContainer: {
    textAlign: 'right',
    fontSize: 14,
  },
  greetingHeadlineName: {
    fontWeight: 700,
    color: '#0029ab',
    textOverflow: 'ellipsis',
  },
};

class GreetingHeader extends Component {
  componentDidMount() {
    this.props.name &&
    this.props.surname &&
    (this.props.lastSuccessfulLogged || this.props.lastPresentLogged)
      ? null
      : this.props.getUserdata();
  }

  render() {
    const {
      classes,
      name,
      surname,
      lastSuccessfulLogged,
      lastPresentLogged,
    } = this.props;

    return (
      <Fragment>
        <div
          style={{
            opacity:
              name && surname && (lastSuccessfulLogged || lastPresentLogged)
                ? 1
                : 0,
          }}
          className={classes.greetingHeadlineContainer}
        >
          <div>
            {moment()
              .format('HH')
              .toString() >= 20 ? (
              <FormattedMessage {...messages.greetingPm} />
            ) : (
              <FormattedMessage {...messages.greetingAm} />
            )}
            {', '}
            <span className={classes.greetingHeadlineName}>
              {name} {surname}
            </span>
            <br />
            <span>
              <FormattedMessage {...messages.lastSuccessfulLoginInformation} />{' '}
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

GreetingHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  name: makeNameSelector(),
  surname: makeSurnameSelector(),
  lastSuccessfulLogged: makeLastSuccessfulLoggedSelector(),
  lastPresentLogged: makeLastPresentLoggedSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserdata: () => {
      dispatch(getNameAction());
      dispatch(getSurnameAction());
      dispatch(getLastPresentLoggedAction());
      dispatch(getLastSuccessfulLoggedAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(GreetingHeader);
