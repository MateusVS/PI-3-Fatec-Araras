import { Grid } from '@mui/material';

import LoginForm from '../LoginForm';
import NewUserForm from '../NewUserForm';

function SignInSignUpBox({ page }) {
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          width: 500,
          maxWidth: '100%',
          height: 550,
          backgroundColor: '#F6F6F6'
        }}
      >
        { page === 'signIn' ? <LoginForm /> : <NewUserForm /> }
      </Grid>
    </>
  );
}

export default SignInSignUpBox;
