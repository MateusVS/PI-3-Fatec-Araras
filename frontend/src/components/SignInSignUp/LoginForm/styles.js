import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: blue;
  &:hover {
    color: red;
  }
`;

export const TextAbout = styled.p`
  margin: 0 20px;
  text-align: center;
  font-size: 1.1em;
`;