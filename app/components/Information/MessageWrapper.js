import styled from 'styled-components';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const MessageWrapper = styled.div`
  text-align: left;
  padding: 0;

  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    padding: 0 130px;
  }
`;

export default MessageWrapper;
