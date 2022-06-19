import { AppBar, Container, Toolbar, Typography } from '@mui/material';

import Logo from '../../assets/img/Logo.png';
import Loggoff from '../../assets/img/power-off.png';

import { Img } from './styles';

import { useAuth } from '../../hooks/auth';

import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { SignOut } = useAuth();

  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: "red" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Img src={Logo} alt="Logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            { window.location.href.toString().includes('/custom-heroes') ? "SuperHeroes" : "My SuperHeroes" }
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
