import { BottomNavigation } from '@mui/material';

import { Copyright } from './styles';

function Footer() {
  return(
    <BottomNavigation sx={{ width: '100%', backgroundColor: 'red', marginTop: '25px', bottom: 0 }}>
      <Copyright>SuperHeroes &copy; 2022</Copyright>
    </BottomNavigation>
  );
}

export default Footer;
