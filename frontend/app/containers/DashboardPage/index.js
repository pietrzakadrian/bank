/**
 *
 * DashboardPage
 *
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';

// Import Components
import { Responsive, WidthProvider } from 'react-grid-layout';
import GreetingHeader from 'components/App/GreetingHeader';
import ContainerWrapper from 'components/App/ContainerWrapper';
import AvailableFunds from 'components/App/AvailableFunds';
import Savings from 'components/App/Savings';
import BankInformation from 'components/App/BankInformation';
import AccountBills from 'components/App/AccountBills';
import GridItemWrapper from 'components/App/GridItemWrapper';
import RecentTransactions from 'components/App/RecentTransactions';
import BankCards from 'components/App/BankCards';
import BankDeposits from 'components/App/BankDeposits';
import BankCredits from 'components/App/BankCredits';
import messages from './messages';

// Import Utils
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

function getFromLS(key) {
  let ls = {};
  if (global.localStorage)
    ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};

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

export default function DashboardPage() {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const originalLayouts = getFromLS('layouts') || {};

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
              layouts={JSON.parse(JSON.stringify(originalLayouts))}
              onLayoutChange={(layout, layouts) => saveToLS('layouts', layouts)}
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

              <GridItemWrapper
                key="6"
                data-grid={{
                  x: 0,
                  y: 3,
                  w: 1,
                  h: 14,
                }}
              >
                <BankCards />
              </GridItemWrapper>

              <GridItemWrapper
                key="7"
                data-grid={{
                  x: 1,
                  y: 3,
                  w: 1,
                  h: 14,
                }}
              >
                <BankDeposits />
              </GridItemWrapper>

              <GridItemWrapper
                key="8"
                data-grid={{
                  x: 2,
                  y: 2,
                  w: 1,
                  h: 14,
                }}
              >
                <BankCredits />
              </GridItemWrapper>
            </ResponsiveGridLayout>
          </ContainerWrapper>
        )}
      </MediaQuery>
    </Fragment>
  );
}
