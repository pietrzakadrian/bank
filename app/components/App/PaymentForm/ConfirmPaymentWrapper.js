/**
 *
 * ConfirmPaymentWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const ConfirmPaymentWrapper = styled.div`
  display: flex;
  margin: 15px auto 5px;
  width: 90%;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: 300px;
  }

  input {
    float: left;
    height: 35px;
    width: 40%;
    margin: 0 auto 0 0;
  }

  button {
    float: right;
    width: 55%;
    margin: 0 0 0 auto;
  }

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

export default ConfirmPaymentWrapper;
