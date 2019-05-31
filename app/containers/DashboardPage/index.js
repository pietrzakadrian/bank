/**
 *
 * DashboardPage
 *
 */

import React, { Fragment } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Responsive, WidthProvider } from 'react-grid-layout';

// Import Material-UI
import { withStyles } from '@material-ui/core';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Copyright from 'components/Copyright';
import Notifier from 'components/Notifier';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

// Import Components
import AvailableFunds from './AvailableFunds';
import BankInformation from './BankInformation';
import AccountBills from './AccountBills';
import BankCards from './BankCards';
import BankDeposits from './BankDeposits';
import BankCredits from './BankCredits';
import RecentTransactions from './RecentTransactions';
import Savings from './Savings';
import GreetingHeader from './GreetingHeader';

// Import Styles
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  grid: {
    width: '100%',
    margin: '-12px auto',
  },
  container: {
    position: 'relative',
    margin: '10px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 1100,
      width: 'calc(100% - 70px)',
    },
  },
  informationHeader: {
    display: 'flex',
    fontSize: 13.5,
    paddingBottom: 5,
    marginTop: '-10px',
  },
  informationHeaderFirst: {
    flex: 1,
  },
  informationHeaderLast: {
    textAlign: 'right',
  },
  gridItem: {
    cursor: 'move',
  },
});
const ResponsiveGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};
/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts);
    this.setState({ layouts });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <FormattedMessage {...messages.helmetDashboardTitle}>
          {title => <Helmet title={title} />}
        </FormattedMessage>

        <GreetingHeader />
        <div className={classes.container}>
          <ResponsiveGridLayout
            layouts={this.state.layouts}
            {...this.props}
            onLayoutChange={(layout, layouts) =>
              this.onLayoutChange(layout, layouts)
            }
            breakpoints={{
              lg: 1100,
              md: 900,
              sm: 610,
              xs: 480,
              xxs: 0,
            }}
            cols={{
              lg: 3,
              md: 3,
              sm: 2,
              xs: 1,
              xxs: 1,
            }}
            rowHeight={9}
            margin={[20, 10]}
            isResizable={false}
            isDraggable={
              window.matchMedia('(min-width: 480px)').matches &&
              window.matchMedia('(min-height: 480px)').matches
            }
          >
            <div
              key="1"
              data-grid={{
                x: 0,
                y: 0,
                w: 1,
                h: 6,
                static: true,
              }}
            >
              <AvailableFunds />
            </div>

            <div
              key="2"
              data-grid={{
                x: 1,
                y: 0,
                w: 1,
                h: 6,
                static: true,
              }}
            >
              <Savings />
            </div>

            <div
              key="3"
              data-grid={{
                x: 2,
                y: 0,
                w: 1,
                h: 6,
                static: true,
              }}
            >
              <BankInformation />
            </div>

            <div
              key="4"
              data-grid={{
                x: 0,
                y: 2,
                w: 2,
                h: 14,
              }}
              className={classes.gridItem}
            >
              <AccountBills />
            </div>

            <div
              key="5"
              data-grid={{
                x: 2,
                y: 2,
                w: 1,
                h: 14,
              }}
              className={classes.gridItem}
            >
              <RecentTransactions />
            </div>

            <div
              key="6"
              data-grid={{
                x: 0,
                y: 3,
                w: 1,
                h: 14,
              }}
              className={classes.gridItem}
            >
              <BankCards />
            </div>

            <div
              key="7"
              data-grid={{
                x: 1,
                y: 3,
                w: 1,
                h: 14,
              }}
              className={classes.gridItem}
            >
              <BankDeposits />
            </div>

            <div
              key="8"
              data-grid={{
                x: 2,
                y: 2,
                w: 1,
                h: 14,
              }}
              className={classes.gridItem}
            >
              <BankCredits />
            </div>
          </ResponsiveGridLayout>
        </div>
        <Notifier className={classes.notifierContainer} />
        <Copyright />
      </Fragment>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch (e) {
      /* Ignore */
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value,
      }),
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  cols: PropTypes.object,
  rowHeight: PropTypes.number,
};

const withReducer = injectReducer({ key: 'dashboardPage', reducer });
const withSaga = injectSaga({
  key: 'dashboardPage',
  saga,
});

export default compose(
  withStyles(styles),
  withSaga,
  withReducer,
)(DashboardPage);
