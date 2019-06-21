/**
 *
 * BadgeWrapper
 *
 */

import styled from 'styled-components';
import Badge from '@material-ui/core/Badge';
import { PRIMARY_RED, PRIMARY_LIGHT } from 'utils/colors';

const BadgeWrapper = styled(Badge)`
  &&& {
    display: inline-block;

    .badge {
      left: -15px;
      right: auto;
      background-color: ${PRIMARY_RED};
      color: ${PRIMARY_LIGHT};
    }
  }
`;

export default BadgeWrapper;
