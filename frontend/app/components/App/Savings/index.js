/**
 *
 * Savings
 *
 */

import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { FormattedMessage } from 'react-intl';
import socketIOClient from 'socket.io-client';
import saga from 'containers/DashboardPage/saga';
import reducer from 'containers/DashboardPage/reducer';

// Import Components
import { PieChart, Pie, Cell } from 'recharts';
import LoadingCircular from 'components/App/LoadingCircular';
import {
  HeavyWidgetWrapper,
  HeavyWidgetHeader,
  HeavyWidgetUnit,
  HeavyWidgetMain,
  HeavyWidgetJoin,
  HeavyWidgetLeftSide,
  HeavyWidgetRightSide,
} from 'components/App/HeavyWidget';
import LoadingWrapper from './LoadingWrapper';
import messages from './messages';

// Import Utils
import ApiEndpoint from 'utils/api.js';
import AuthService from 'services/auth.service';

// Import Actions
import {
  getRechartsColorsAction,
  getRechartsDataAction,
  getSavingsAction,
} from 'containers/DashboardPage/actions';

// Import Selectors
import {
  makeRechartsColorsSelector,
  makeRechartsDataSelector,
  makeSavingsSelector,
} from 'containers/DashboardPage/selectors';

const stateSelector = createStructuredSelector({
  savings: makeSavingsSelector(),
  rechartsColors: makeRechartsColorsSelector(),
  rechartsData: makeRechartsDataSelector(),
});



export default function Savings() {
const api = new ApiEndpoint();
const auth = new AuthService();
const userId = auth.getUserId();
const baseURL = api.getBasePath();
const key = 'dashboardPage';
  const dispatch = useDispatch();
  const getSavings = () => dispatch(getSavingsAction());
  const getRechartsColors = () => dispatch(getRechartsColorsAction());
  const getRechartsData = () => dispatch(getRechartsDataAction());
  const { savings, rechartsColors, rechartsData } = useSelector(stateSelector);
  const socket = socketIOClient(`${baseURL}`);
  let id = 0;

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  useEffect(() => {
    if (!savings) getSavings();
    if (rechartsColors.length) getRechartsColors();
    if (getRechartsData.length) getRechartsData();

    socket.on('new notification', id => {
      if (id === userId) {
        getSavings();
        getRechartsColors();
        getRechartsData();
      };
    });
  }, []);

  return (
    <HeavyWidgetWrapper>
      {rechartsData && rechartsColors && (savings || savings === 0) ? (
        <Fragment>
          <HeavyWidgetLeftSide pie>
            <HeavyWidgetHeader>
              <FormattedMessage {...messages.savings} />
            </HeavyWidgetHeader>
            <HeavyWidgetJoin>
              <HeavyWidgetMain>{savings}</HeavyWidgetMain>{' '}
              <HeavyWidgetUnit>%</HeavyWidgetUnit>
            </HeavyWidgetJoin>
          </HeavyWidgetLeftSide>
          <HeavyWidgetRightSide pie>
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
                {rechartsData.map((entry, index) => (
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
