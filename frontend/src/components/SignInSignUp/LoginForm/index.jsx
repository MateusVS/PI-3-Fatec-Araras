import { TextField, Button, Grid } from '@mui/material';

import { CustomLink } from './styles';

import SignInSignUpLogo from '../Logo';

function LoginForm() {
  return (
    <form onSubmit={() => {}}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: 500, width: 500 }}
      >
        <SignInSignUpLogo />
        <TextField id="email" label="E-mail" variant="outlined" sx={{ width: '75%', marginTop: 2 }} />
        <TextField type="password" id="password" label="Password" variant="outlined" sx={{ width: '75%', marginTop: 2 }} />
        <Button variant="contained" type="submit" color="success" size="large" sx={{ width: '75%', marginTop: 5 }}>
          Sign In
        </Button>
        <br />
        <h4>New to SuperHeroes? <CustomLink to="/signup">Create an account.</CustomLink></h4>
      </Grid>
    </form>
  );
}

export default LoginForm;
