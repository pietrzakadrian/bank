/**
 *
 * Asynchronously loads the component for DashboardPage
 *
 */

import React from 'react';
import loadable from 'loadable-components';
import LoadingLinear from 'components/App/LoadingLinear';

const LoadingComponent = () => <LoadingLinear />;

export default loadable(() => import('./index'), {
  LoadingComponent,
});
