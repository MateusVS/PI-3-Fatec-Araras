import styled from 'styled-components';
import wallpaper from '../../../assets/img/comics.jpg';

export const Container = styled.div`
  background-image: url(${wallpaper});
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
