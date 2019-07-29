/**
 *
 * MessageContainer
 *
 */

import styled from 'styled-components';
import { SECONDARY_BACKGROUND_GREY } from 'utils/colors';

const MessageContainer = styled.div`
    overflow-y: auto;
    height: 139px;
    width: 100%;

    table {
        td {
          padding: 8px 14px;
          font-family: Lato;
          &:hover {
            background-color: ${SECONDARY_BACKGROUND_GREY}!important;
            cursor: auto;
          }
        }
 `;

export default MessageContainer;
