import styled from 'styled-components';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const MessageWrapper = styled.div`
  text-align: left;
  padding: 5px;

  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    padding: 5px 130px;
  }
`;

export default MessageWrapper;
