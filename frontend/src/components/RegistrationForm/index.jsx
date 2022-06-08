import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Grid, TextField } from '@mui/material';
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
          <TextField label="Full Name" variant='outlined' color='error' fullWidth {...register("FullName", {required: true})} />
        </Grid>
        <Grid item lg={6}>
          <TextField label="Aliases" variant='outlined' color='error' fullWidth />
        </Grid>
      </Grid>
    </form>
  );
}

export default RegistrationForm;
