import styled from 'styled-components';

const FooterTitleWrapper = styled.h3`
  text-align: left;
  padding: 15px;
  margin: 0;
  font-weight: 700;
  display: ${props =>
    props.location !== '/register' && props.location !== '/login'
      ? 'none'
      : 'block'};
`;

export default FooterTitleWrapper;
