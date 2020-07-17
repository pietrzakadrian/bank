/**
 *
 * FormWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_BACKGROUND_GREY } from 'utils/colors';

const FormWrapper = styled.div`
  padding: 25px;
  background-color: ${PRIMARY_BACKGROUND_GREY};
  margin-bottom: 30px;
  box-shadow: 0em 0.0625em 0.1875em 0em rgba(0, 0, 0, 0.2),
    0em 0.0625em 0.0625em 0em rgba(0, 0, 0, 0.14),
    0em 0.125em 0.0625em -0.0625em rgba(0, 0, 0, 0.12);
`;

export default FormWrapper;
