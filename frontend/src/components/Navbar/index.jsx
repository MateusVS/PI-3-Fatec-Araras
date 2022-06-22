import { AppBar, Container, Toolbar, Typography } from '@mui/material';

import Logo from '../../assets/img/Logo.png';
import Loggoff from '../../assets/img/power-off.png';

import { Img, CustomLink } from './styles';

import { useAuth } from '../../hooks/auth';

function NavBar() {
  const { SignOut } = useAuth();

  return (
    <AppBar position="static" sx={{ bgcolor: "red" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Img src={Logo} alt="Logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            { window.location.href.toString().includes('/custom-heroes') ?
                <CustomLink to="/">SuperHeroes</CustomLink> :
                <CustomLink to="/custom-heroes">My SuperHeroes</CustomLink>
            }
          </Typography>
          <div>
            <Img src={Loggoff} alt="Quit" onClick={SignOut} title="Exit" />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
