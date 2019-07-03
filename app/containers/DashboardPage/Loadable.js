/**
 *
 * Asynchronously loads the component for DashboardPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
