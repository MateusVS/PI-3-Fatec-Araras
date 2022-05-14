import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField, Button, Grid } from '@mui/material';
import { NotificationManager } from 'react-notifications';

import { CustomLink } from './styles';

import SignInSignUpLogo from '../Logo';

import { useAuth } from '../../../hooks/auth';

const loginFormSchema = yup.object().shape({
  Email: yup.string().required('The E-mail field is required').email('The E-mail field must be a E-mail'),
  Password: yup.string().required('The Password field is required'),
});

function LoginForm() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginFormSchema)
  });

  Object.values(errors).map((error) => NotificationManager.error(error.message, 'Error message', 5000));

  const { SignIn } = useAuth();

  const handleLogin = async({ Email, Password }) => {
    SignIn(Email, Password);
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: 500, width: 500 }}
      >
        <SignInSignUpLogo />
        <TextField id="email" label="E-mail" variant="outlined" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} sx={{ width: '75%', marginTop: 2 }} />
        <TextField type="password" label="Password" variant="outlined" {...register("Password", {required: true })} sx={{ width: '75%', marginTop: 2 }} />
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
