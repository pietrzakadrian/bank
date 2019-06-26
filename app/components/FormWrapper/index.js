/**
 *
 * FormWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_GREY, PRIMARY_LIGHT } from 'utils/colors';

const FormWrapper = styled.main`
  text-align: center;
  width: 100%;
  background-color: ${props =>
    props.background === 'white' ? PRIMARY_LIGHT : PRIMARY_GREY};
  padding: 15px 0;
`;

export default FormWrapper;
