import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: blue;
  &:hover {
    color: red;
  }
`;

export const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
`;
