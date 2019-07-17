/**
 *
 * Notifier
 *
 */

import { Component } from 'react';
import { makeSnackbarsSelector } from 'containers/App/selectors';
import { removeSnackbarAction } from 'containers/App/actions';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

class Notifier extends Component {
  displayed = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ snackbars, onRemoveSnackbar }) {
    if (!snackbars.length) {
      this.displayed = [];
      return false;
    }

    const { snackbars: currentSnacks } = this.props;
    let notExists = false;

    for (let i = 0; i < snackbars.length; i += 1) {
      const newSnack = snackbars[i];

      if (newSnack.dismissed) onRemoveSnackbar();

      if (!notExists) {
        notExists =
          notExists ||
          !currentSnacks.filter(({ key }) => newSnack.key === key).length;
      }
    }

    return notExists;
  }

  componentDidUpdate({ onRemoveSnackbar }) {
    const { snackbars = [] } = this.props;

    snackbars.forEach(({ key, message, options = {} }) => {
      if (this.displayed.includes(key)) return;

      this.props.enqueueSnackbar(message, {
        ...options,
        onClose: (event, reason, id) => {
          if (options.onClose) {
            options.onClose(event, reason, id);
          }
          onRemoveSnackbar();
        },
      });

      this.storeDisplayed(key);
    });
  }

  render() {
    return null;
  }
}

Notifier.propTypes = {
  snackbars: PropTypes.array,
  enqueueSnackbar: PropTypes.func,
  onRemoveSnackbar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  snackbars: makeSnackbarsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRemoveSnackbar: () => dispatch(removeSnackbarAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSnackbar,
  withConnect,
)(Notifier);
