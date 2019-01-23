/*
 * Dashboard
 *
 * This is the first page thing users see of our App after logging in, at the '/dashboard' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import RGL, { Responsive, WidthProvider } from 'react-grid-layout';
import withAuth from '../../services/withAuth';
import './styles.css';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// Import Material-UI

// Import Components
import AvailableFunds from './AvailableFunds';
import BankInformation from './BankInformation';
import AccountBills from './AccountBills';
import RecentTransactions from './RecentTransactions';
import AuthService from '../../services/AuthService';
import GreetingHeadline from './GreetingHeadline';
import Copyright from './Copyright';
import BankCards from './BankCards';
import BankDeposits from './BankDeposits';
import BankCredits from './BankCredits';

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

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };

    this.Auth = new AuthService();
  }

  static get defaultProps() {
    return {
      className: 'layout',
      cols: { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 },
      rowHeight: 9,
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts);
    this.setState({ layouts });
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Helmet title="Dashboard · Bank Application" />
        <GreetingHeadline id={this.props.user.id} />
        <div className={classes.container}>
          <ResponsiveGridLayout
            layouts={this.state.layouts}
            {...this.props}
            onLayoutChange={(layout, layouts) =>
              this.onLayoutChange(layout, layouts)
            }
            breakpoints={{ lg: 1100, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
            rowHeight={9}
            margin={[20, 10]}
            isResizable={false}
            isDraggable={window.matchMedia('(min-width: 480px)').matches}
          >
            <div key="1" data-grid={{ x: 0, y: 0, w: 1, h: 6, static: true }}>
              <AvailableFunds id={this.props.user.id} />
            </div>
            <div key="2" data-grid={{ x: 1, y: 0, w: 1, h: 6, static: true }}>
              <BankInformation />
            </div>
            <div key="3" data-grid={{ x: 2, y: 0, w: 1, h: 6, static: true }}>
              <BankInformation />
            </div>

            {/* 2 belka */}

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
              <AccountBills id={this.props.user.id} />
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
              <RecentTransactions id={this.props.user.id} />
            </div>

            {/* 2 belka */}

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
};

export default withAuth(withStyles(styles)(DashboardPage));
