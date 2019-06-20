/**
 *
 * DashboardPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import GreetingHeader from 'components/App/GreetingHeader';
import ContainerWrapper from 'components/App/ContainerWrapper';
import MediaQuery from 'react-responsive';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
import AvailableFunds from 'components/App/AvailableFunds';
import Savings from 'components/App/Savings';
import BankInformation from 'components/App/BankInformation';
import AccountBills from 'components/App/AccountBills';
import GridItemWrapper from 'components/App/GridItemWrapper';
import RecentTransactions from 'components/App/RecentTransactions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function DashboardPage() {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });

  const ResponsiveGridLayout = WidthProvider(Responsive);

  return (
    <Fragment>
      <FormattedMessage {...messages.helmetDashboardTitle}>
        {title => <Helmet title={title} />}
      </FormattedMessage>

      <GreetingHeader />
      <MediaQuery
        minWidth={PHONE_LANDSCAPE_VIEWPORT_WIDTH}
        minHeight={PHONE_LANDSCAPE_VIEWPORT_WIDTH}
      >
        {matches => (
          <ContainerWrapper>
            <ResponsiveGridLayout
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
              isDraggable={matches}
            >
              <GridItemWrapper
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
              </GridItemWrapper>

              <GridItemWrapper
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
              </GridItemWrapper>

              <GridItemWrapper
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
              </GridItemWrapper>

              <GridItemWrapper
                key="4"
                data-grid={{
                  x: 0,
                  y: 2,
                  w: 2,
                  h: 14,
                }}
              >
                <AccountBills />
              </GridItemWrapper>

              <GridItemWrapper
                key="5"
                data-grid={{
                  x: 2,
                  y: 2,
                  w: 1,
                  h: 14,
                }}
              >
                <RecentTransactions />
              </GridItemWrapper>
            </ResponsiveGridLayout>
          </ContainerWrapper>
        )}
      </MediaQuery>
      <ContainerWrapper />
    </Fragment>
  );
}

DashboardPage.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardPage);
