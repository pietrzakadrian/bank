import Search from '@material-ui/icons/Search';
import styled from 'styled-components';
import { PRIMARY_LIGHT, PRIMARY_BORDER_GREY } from 'utils/colors';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const SearchIcon = styled(Search)`
  margin-top: -1.7px;
  position: absolute;
  color: ${PRIMARY_BORDER_GREY};
  background-color: ${PRIMARY_LIGHT};
  display: block;
  right: 23px;
  top: 9px;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    right: 5px;
    top: 9px;
  }
`;

export default SearchIcon;
