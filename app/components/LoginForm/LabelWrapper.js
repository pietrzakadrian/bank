import styled from 'styled-components';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const LabelWrapper = styled.label`
  margin: 10px auto 1px;
  text-align: left;
  font-size: 18px;
  letter-spacing: 0.3px;
  width: 90%;
  display: block;

  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    width: 17rem;
  }
`;

export default LabelWrapper;
