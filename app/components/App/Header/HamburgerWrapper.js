/**
 *
 * HamburgerWrapper
 *
 */

import { styled } from '@material-ui/styles';

import { PRIMARY_BLUE_DARK } from 'utils/colors';
import IconButton from '@material-ui/core/IconButton';

const HamburgerWrapper = styled(IconButton)({
  color: `${PRIMARY_BLUE_DARK}`,
});

export default HamburgerWrapper;
