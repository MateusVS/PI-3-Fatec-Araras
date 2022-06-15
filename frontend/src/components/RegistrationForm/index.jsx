import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Grid, TextField, Button } from '@mui/material';
import { NotificationManager } from 'react-notifications';

const formSchema = yup.object().shape({
  FullName: yup.string().required('The Full Name field is required').max(50, 'The Name field must have a maximum of 50 characters'),
});

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema)
  });

  Object.values(errors).map((error) => NotificationManager.error(error.message, 'Error message', 2000));

  return (
    <form onSubmit={() => handleSubmit()}>
      <Grid container spacing={4}>
        <Grid item lg={6}>
          <TextField label="Full Name" variant='outlined' color='error' fullWidth {...register("fullName", {required: true})} />
        </Grid>
        <Grid item lg={6}>
          <TextField label="Aliases" variant='outlined' color='error' fullWidth />
        </Grid>

        <Grid item lg={3}>
          <TextField label="Eye Color" variant='outlined' color='error' fullWidth />
        </Grid>
        <Grid item lg={3}>
          <TextField label="Hair Color" variant='outlined' color='error' fullWidth />
        </Grid>
        <Grid item lg={6}>
          <TextField label="Profession" variant='outlined' color='error' fullWidth />
        </Grid>

        <Grid item lg={4}>
          <TextField label="First Apparition" variant='outlined' color='error' fullWidth />
        </Grid>
        <Grid item lg={4}>
          <TextField label="Published By" variant='outlined' color='error' fullWidth />
        </Grid>
        <Grid item lg={4} container direction="column" alignItems="center" justifyContent="center">
          <input accept="image/*" type="file" />
        </Grid>

      </Grid>

      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Button variant="contained" type="submit" color="success" size="large" sx={{ width: '100px', marginTop: 5 }}>
          Create
        </Button>
      </Grid>
    </form>
  );
}

export default RegistrationForm;
