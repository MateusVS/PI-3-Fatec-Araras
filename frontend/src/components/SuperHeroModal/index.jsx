import { useState, useEffect } from 'react';

import api from '../../services/api';

import { NotificationManager } from 'react-notifications';
import { Box, Typography, Modal, Grid, Button } from '@mui/material';

import { Span, Img } from './styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
  height: '95%',
  display: 'block'
};

function SuperHeroModal({ open, heroId, handleClose }) {
  const [superhero, setSuperhero] = useState({});

  useEffect(() => {
    if (heroId !== 0) {
      let route = `/superheroes/${heroId}`;

      if (window.location.href.toString().includes('/custom-heroes')) {
        route = `/users/${localStorage.getItem('@superhero:user_id')}/superheroescustom/${heroId}`;
      }

      api.get(route)
        .then(function (response) {
          setSuperhero(response.data);
          console.log(response.data)
        })
        .catch(function (error) {
          NotificationManager.error(error.message, 'Error message', 2000);
        });
    }
  }, [heroId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container justifyContent={'flex-end'} spacing={2}>
          <Button onClick={handleClose} style={{backgroundColor: 'red', color: 'white', fontSize: '1.1rem'}}>Close</Button>
        </Grid>
        <Grid container justifyContent={'space-evenly'} spacing={2}>
          <Grid item lg={6} md={8} sm={10}>
            { window.location.href.toString().includes('/custom-heroes') ?
              superhero.hasOwnProperty("image") ? <Img src={superhero.image} alt={superhero.fullName} style={{maxHeight: '600px'}} /> : "" :
              superhero.hasOwnProperty("images") ? <Img src={superhero.images.lg} alt={superhero.name} style={{maxHeight: '600px'}} /> : ""}
          </Grid>
          <Grid item lg={6} md={3} sm={10}>
            <Typography id="modal-modal-title" textAlign={'center'} variant="h4" component="h2">
              { window.location.href.toString().includes('/custom-heroes') ? superhero.fullName : superhero.name }
            </Typography>

            <Grid id="modal-modal-description" sx={{ mt: 2 }}>
            { window.location.href.toString().includes('/custom-heroes') ?
                <Grid container justifyContent={'space-between'} spacing={2}>
                  <Grid item lg={7} fontSize={'1.1rem'}>
                    <h2>Biography</h2>
                    <Span>FullName: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.fullName}</span></Span><br/>
                    { superhero.hasOwnProperty("nickName") ? <><Span>Alias: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.nickName}</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("firstApparition") ? <><Span>First Apparition: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.firstApparition}</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("publishedBy") ? <><Span>Publisher: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.publishedBy}</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("profession") ? <><Span>Profession: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.profession}</span></Span><br/></> : "" }
                  </Grid>
                  <Grid item lg={5} fontSize={'1.1rem'}>
                    <h2>Appearance</h2>
                    { superhero.hasOwnProperty("height") ? <><Span>Height: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.height} cm</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("weight") ? <><Span>Weight: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.weight} kg</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("eyeColor") ? <><Span>Eye Color: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.eyeColor}</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("hairColor") ? <><Span>Hair Color: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.hairColor}</span></Span><br/></> : "" }
                  </Grid>
                  <Grid item lg={7} fontSize={'1.1rem'}>
                    <h2>Powerstats</h2>
                    { superhero.hasOwnProperty("intelligence") ? <><Span>Intelligence: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.intelligence}</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("strength") ? <><Span>Strength: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.strength}</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("speed") ? <><Span>Speed: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.speed}</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("durability") ? <><Span>Durability: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.durability}</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("power") ? <><Span>Power: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.power}</span></Span><br/></> : "" }
                    { superhero.hasOwnProperty("combat") ? <><Span>Combat: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{superhero.combat}</span></Span><br/></> : "" }
                  </Grid>
                </Grid> :
                <Grid container justifyContent={'space-between'} spacing={2}>
                  <Grid item lg={7} fontSize={'1.1rem'}>
                    {superhero.hasOwnProperty("biography") ?
                      <>
                        <h2>Biography</h2>
                        {
                          Object.entries(superhero.biography).map((value) => (
                            <>
                              <Span key={value[0] + value[1]}>{value[0]}: {Array.isArray(value[1]) ? <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1][1]}</span> : <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1]}</span> } </Span>
                              <br />
                            </>
                          ))
                        }
                      </>
                      : ""
                    }
                  </Grid>
                  <Grid item lg={5} fontSize={'1.1rem'}>
                    {superhero.hasOwnProperty("appearance") ?
                      <>
                        <h2>Appearance</h2>
                        {
                          Object.entries(superhero.appearance).map((value) => (
                            <>
                              <Span key={value[0] + value[1]}>{value[0]}: {Array.isArray(value[1]) ? <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1][1]}</span> : <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1]}</span>} </Span>
                              <br />
                            </>
                          ))
                        }
                      </>
                      : ""
                    }
                  </Grid>
                  <Grid item lg={7} fontSize={'1.1rem'}>
                    {superhero.hasOwnProperty("powerstats") ?
                      <>
                        <h2>Powerstats</h2>
                        {
                          Object.entries(superhero.powerstats).map((value) => (
                            <>
                              <Span key={value[0] + value[1]}>{value[0]}: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1]}</span> </Span>
                              <br />
                            </>
                          ))
                        }
                      </>
                      : ""
                    }
                  </Grid>
                  <Grid item lg={5} fontSize={'1.1rem'}>
                    {superhero.hasOwnProperty("work") ?
                      <>
                        <h2>Work</h2>
                        {
                          Object.entries(superhero.work).map((value) => (
                            <>
                              <Span key={value[0] + value[1]}>{value[0]}: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1]}</span> </Span>
                              <br />
                            </>
                          ))
                        }
                      </>
                      : ""
                    }
                  </Grid>
                  <Grid item lg={10} fontSize={'1.1rem'}>
                    {superhero.hasOwnProperty("connections") ?
                      <>
                        <h2>Connections</h2>
                        {
                          Object.entries(superhero.connections).map((value) => (
                            <>
                              <Span key={value[0] + value[1]}>{value[0]}: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1]}</span> </Span>
                              <br />
                            </>
                          ))
                        }
                      </>
                      : ""
                    }
                  </Grid>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default SuperHeroModal;
