import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField, Button, Grid } from '@mui/material';
import { NotificationManager } from 'react-notifications';

import { CustomLink } from './styles';

import SignInSignUpLogo from '../Logo';

const createUserForm = yup.object().shape({
  Name: yup.string().required('The Name field is required').max(50, 'The Name field must have a maximum of 50 characters'),
  Email: yup.string().required('The E-mail field is required').email('The E-mail field must be a E-mail'),
  Password: yup.string().required('The Password field is required').min(5, 'The Password field must have a minimun 5 characters').max(8, 'The Password field must have a maximum of 8 characters'),
  ConfirmPassword: yup.string().required('The Confirm Password field is required').min(5, 'The Confirm Password field must have a minimun 5 characters').max(8, 'The Password field must have a maximum of 8 characters').oneOf([yup.ref('Password'), null], 'Passwords must match')
});

function NewUserForm() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(createUserForm)
  });

  const handleCreateUser = async(data) => {
    alert("submit")
  }

  Object.values(errors).map((error) => NotificationManager.error(error.message, 'Error message', 2000));

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: 500, width: 500 }}
        >
          <SignInSignUpLogo />
          <TextField type="text" label="Name" variant="outlined" {...register("Name", {required: true, maxLength: 50})} sx={{ width: '75%', marginTop: 2 }} />
          <TextField type="email" label="E-mail" variant="outlined" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} sx={{ width: '75%', marginTop: 2 }} />
          <TextField type="password" label="Password" variant="outlined" {...register("Password", {required: true, minLength: 5, maxLength: 8})} sx={{ width: '75%', marginTop: 2 }} />
          <TextField type="password" label="Confirm Password" variant="outlined" {...register("ConfirmPassword", {required: true, minLength: 5, maxLength: 8})} sx={{ width: '75%', marginTop: 2 }} />
          <Button variant="contained" type="submit" color="success" size="large" sx={{ width: '75%', marginTop: 2 }}>
            Create Account
          </Button>
          <br />
          <h4>Already have an account? <CustomLink to="/login">Sign in →</CustomLink></h4>
        </Grid>
      </form>
    </>
  );
}

export default NewUserForm;
