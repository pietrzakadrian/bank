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
import {
  PHONE_LANDSCAPE_VIEWPORT_WIDTH,
  DESKTOP_VIEWPORT_WIDTH,
  TABLET_LANDSCAPE_VIEWPORT_WIDTH,
  TABLET_VIEWPORT_WIDTH,
} from 'utils/rwd';
import AvailableFunds from 'components/App/AvailableFunds';
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
                lg: `${DESKTOP_VIEWPORT_WIDTH}`,
                md: `${TABLET_LANDSCAPE_VIEWPORT_WIDTH}`,
                sm: `${TABLET_VIEWPORT_WIDTH}`,
                xs: `${PHONE_LANDSCAPE_VIEWPORT_WIDTH}`,
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
