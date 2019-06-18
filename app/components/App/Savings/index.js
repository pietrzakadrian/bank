/**
 *
 * Savings
 *
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import HeavyWidgetWrapper from 'components/App/HeavyWidget/HeavyWidgetWrapper';
import HeavyWidgetLeftSide from 'components/App/HeavyWidget/HeavyWidgetLeftSide';
import HeavyWidgetRightSide from 'components/App/HeavyWidget/HeavyWidgetRightSide';
import HeavyWidgetJoin from 'components/App/HeavyWidget/HeavyWidgetJoin';
import HeavyWidgetHeader from 'components/App/HeavyWidget/HeavyWidgetHeader';
import HeavyWidgetMain from 'components/App/HeavyWidget/HeavyWidgetMain';
import HeavyWidgetUnit from 'components/App/HeavyWidget/HeavyWidgetUnit';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/DashboardPage/saga';
import reducer from 'containers/DashboardPage/reducer';
import { PieChart, Pie, Cell } from 'recharts';
import LoadingCircular from 'components/App/LoadingCircular';
import { FormattedMessage } from 'react-intl';
import {
  getRechartsColorsAction,
  getRechartsDataAction,
  getRechartsProcentAction,
} from 'containers/DashboardPage/actions';
import {
  makeRechartsColorsSelector,
  makeRechartsProcentSelector,
  makeRechartsDataSelector,
} from 'containers/DashboardPage/selectors';
import LoadingWrapper from './LoadingWrapper';
import messages from './messages';

function Savings({
  rechartsColors,
  rechartsProcent,
  rechartsData,
  getRechartsColors,
  getRechartsData,
  getRechartsProcent,
}) {
  useInjectSaga({ key: 'dashboardPage', saga });
  useInjectReducer({ key: 'dashboardPage', reducer });
  useEffect(() => {
    getRechartsColors();
    getRechartsData();
    getRechartsProcent();
  }, []);

  return (
    <HeavyWidgetWrapper>
      {rechartsData &&
      rechartsColors &&
      (rechartsProcent || rechartsProcent === 0) ? (
        <Fragment>
          <HeavyWidgetLeftSide>
            <HeavyWidgetHeader>
              <FormattedMessage {...messages.savings} />
            </HeavyWidgetHeader>
              <HeavyWidgetJoin>
              <HeavyWidgetMain>{rechartsProcent}</HeavyWidgetMain>{' '}
              <HeavyWidgetUnit>%</HeavyWidgetUnit>
            </HeavyWidgetJoin>
          </HeavyWidgetLeftSide>
          <HeavyWidgetRightSide>
              <PieChart width={200} height={200}>
                <Pie
                  data={rechartsData}
                  dataKey="value"
                cx={100}
                cy={100}
                  innerRadius={70}
                  outerRadius={80}
                  fill="#8884d8"
                paddingAngle={0}
                >
                {rechartsData.map((entry, index, id) => (
                  <Cell
                      key={id++}
                      fill={rechartsColors[index % rechartsColors.length]}
                  />
                ))}
              </Pie>
              </PieChart>
          </HeavyWidgetRightSide>
        </Fragment>
      ) : (
        <LoadingWrapper>
          <LoadingCircular />
        </LoadingWrapper>
      )}
    </HeavyWidgetWrapper>
  );
}

Savings.propTypes = {
  getRechartsColors: PropTypes.func,
  getRechartsData: PropTypes.func,
  getRechartsProcent: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  rechartsColors: makeRechartsColorsSelector(),
  rechartsProcent: makeRechartsProcentSelector(),
  rechartsData: makeRechartsDataSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRechartsColors: () => dispatch(getRechartsColorsAction()),
    getRechartsData: () => dispatch(getRechartsDataAction()),
    getRechartsProcent: () => dispatch(getRechartsProcentAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Savings);
