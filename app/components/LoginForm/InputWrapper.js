import styled from 'styled-components';
import { PRIMARY_LIGHT, PRIMARY_BORDER_GREY } from 'utils/colors';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const InputWrapper = styled.input`
  padding: 10px;
  height: 37px;
  border: 1px solid ${PRIMARY_BORDER_GREY};
  display: block;
  margin: 0 auto;
  background-color: ${PRIMARY_LIGHT};
  border-radius: 2px;
  width: 90%;

  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    width: 17rem;
  }
`;

export default InputWrapper;
