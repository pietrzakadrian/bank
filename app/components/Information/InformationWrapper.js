import styled from 'styled-components';
import { SECONDARY_BLUE_LIGHT, PRIMARY_LIGHT } from 'utils/colors';
import { DESKTOP_VIEWPORT_WIDTH } from 'utils/rwd';

const InformationWrapper = styled.section`
  max-width: ${DESKTOP_VIEWPORT_WIDTH};
  padding: 10px 3%;
  margin: 10px auto;
  border-radius: 2px;
  background-color: ${SECONDARY_BLUE_LIGHT};
  color: ${PRIMARY_LIGHT};
`;

export default InformationWrapper;
