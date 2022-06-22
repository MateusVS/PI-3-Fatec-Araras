import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import api from '../../services/api';

import { Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { NotificationManager } from 'react-notifications';

const formSchema = yup.object().shape({
  fullName: yup.string().required('The Full Name field is required').max(50, 'The Name field must have a maximum of 50 characters'),
  firstHeroId: yup.number().required('The First Hero is required').positive('The First Hero is not selected'),
  secondHeroId: yup.number().required('The Second Hero is required').positive('The Second Hero is not selected'),
});

function RegistrationForm({ cardsList }) {
  const [newHeroImage, setNewHeroImage] = useState('');
  const [imageHero1, setImageHero1] = useState('');
  //const [imageHero2, setImageHero2] = useState('');

  const changeImg1 = (e) => {
    alert("Mudou")
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema)
  });

  Object.values(errors).map((error) => NotificationManager.error(error.message, 'Error message', 2000));

  const handleCreateHero = async(prop) => {
    prop.image = newHeroImage;
    await api.post(`/users/${localStorage.getItem('@superhero:user_id')}/superheroescustom`, prop)
      .then((response) => {
        NotificationManager.success('SuperHero Created Successfully', 'Success');
      })
      .catch(function (error) {
        NotificationManager.error(error.message, 'Error', 2000);
      });
  }

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setNewHeroImage(base64);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(handleCreateHero)}>
      <Grid container spacing={4}>
        <Grid item lg={6}>
          <TextField label="Full Name" variant='outlined' color='error' fullWidth {...register("fullName", {required: true})} />
        </Grid>
        <Grid item lg={6}>
          <TextField label="Aliases" variant='outlined' color='error' fullWidth {...register("nickName")} />
        </Grid>

        <Grid item lg={3}>
          <TextField label="Eye Color" variant='outlined' color='error' fullWidth {...register("eyeColor")} />
        </Grid>
        <Grid item lg={3}>
          <TextField label="Hair Color" variant='outlined' color='error' fullWidth {...register("hairColor")} />
        </Grid>
        <Grid item lg={6}>
          <TextField label="Profession" variant='outlined' color='error' fullWidth {...register("profession")} />
        </Grid>

        <Grid item lg={4}>
          <TextField label="First Apparition" variant='outlined' color='error' fullWidth {...register("firstApparition")} />
        </Grid>
        <Grid item lg={4}>
          <TextField label="Published By" variant='outlined' color='error' fullWidth {...register("publishedBy")} />
        </Grid>
        <Grid item lg={4} container direction="column" alignItems="center" justifyContent="center">
          <input accept="image/*" type="file" onChange={e => handleFileRead(e)} />
        </Grid>

        <Grid item lg={4} sm={12}>
          {
            imageHero1 !== '' ? <img src={imageHero1} alt="" /> : ""
          }
          <FormControl color='error' fullWidth>
            <InputLabel id="first-hero">First Hero</InputLabel>
            <Select labelId="first-hero" defaultValue={cardsList[0].id} label="First Hero" variant='outlined' color='error' onChange={e => changeImg1(e)} fullWidth {...register("firstHeroId", {required: true})} >
              {cardsList !== null && cardsList.length > 0 ? cardsList.map(card => (
                <MenuItem value={card.id} key={card.id}>{card.name}</MenuItem>
              )) : ""}
            </Select>
          </FormControl>
        </Grid>

        <Grid item lg={4}>

        </Grid>

        <Grid item lg={4} sm={12}>
          <FormControl color='error' fullWidth>
            <InputLabel id="second-hero">Second Hero</InputLabel>
            <Select labelId="second-hero" defaultValue={cardsList[1].id} label="Second Hero" variant='outlined' color='error' fullWidth {...register("secondHeroId", {required: true})}>
            {cardsList !== null && cardsList.length > 0 ? cardsList.map(card => (
                <MenuItem value={card.id} key={card.id}>{card.name}</MenuItem>
              )) : ""}
            </Select>
          </FormControl>
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
