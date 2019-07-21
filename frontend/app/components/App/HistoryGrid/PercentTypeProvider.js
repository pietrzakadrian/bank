/**
 *
 * PercentTypeProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import AmountFormatter from './AmountFormatter';

export default function PercentTypeProvider(props) {
  return <DataTypeProvider formatterComponent={AmountFormatter} {...props} />;
}

PercentTypeProvider.propTypes = {
  props: PropTypes.shape({
    for: PropTypes.array.isRequired,
  }),
};
