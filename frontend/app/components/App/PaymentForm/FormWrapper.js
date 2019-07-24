/**
 *
 * FormWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_GREY } from 'utils/colors';

const FormWrapper = styled.div`
  text-align: center;
  width: 100%;
  background-color: ${PRIMARY_GREY};
  padding: 15px 0 15px;
  box-shadow: 0em 0.0625em 0.1875em 0em rgba(0, 0, 0, 0.2),
    0em 0.0625em 0.0625em 0em rgba(0, 0, 0, 0.14),
    0em 0.125em 0.0625em -0.0625em rgba(0, 0, 0, 0.12);
`;

export default FormWrapper;
