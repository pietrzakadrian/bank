import styled from 'styled-components';
import { BORDER_GREY_LIGHT } from 'utils/colors';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const SubheaderWrapper = styled.section`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${BORDER_GREY_LIGHT};
  padding: 0;

  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    padding: 0 40px;
  }
`;

export default SubheaderWrapper;
