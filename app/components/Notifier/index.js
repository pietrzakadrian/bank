/* eslint-disable react/prop-types */
/* eslint-disable no-continue */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { createStructuredSelector } from 'reselect';
import { removeSnackbarAction } from 'containers/App/actions';
import { makeNotificationsSelector } from 'containers/App/selectors';
import CustomNoification from 'components/App/CustomNoification';

class Notifier extends Component {
  displayed = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (notExists) continue;
      notExists =
        notExists ||
        !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;

    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;
      // Display snackbar using notistack
      this.props.enqueueSnackbar(notification.message, notification.options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      this.props.onRemoveSnackbar(notification.key);
    });
  }

  render() {
    return null;
  }
}

Notifier.propTypes = {
  enqueueSnackbar: PropTypes.func,
  onRemoveSnackbar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  notifications: makeNotificationsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRemoveSnackbar: key => dispatch(removeSnackbarAction(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSnackbar(Notifier));
