/**
 *
 * PercentTypeProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import AmountFormatter from './AmountFormatter';

function PercentTypeProvider(props) {
  return <DataTypeProvider formatterComponent={AmountFormatter} {...props} />;
}

PercentTypeProvider.propTypes = {};

export default PercentTypeProvider;
