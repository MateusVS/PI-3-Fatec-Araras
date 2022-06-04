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
      api.get(`/superheroes/${heroId}`)
        .then(function (response) {
          setSuperhero(response.data);
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
            {superhero.hasOwnProperty("images") ? <Img src={superhero.images.lg} alt={superhero.name} style={{maxHeight: '600px'}} /> : ""}
          </Grid>
          <Grid item lg={6} md={3} sm={10}>
            <Typography id="modal-modal-title" textAlign={'center'} variant="h4" component="h2">
              {superhero.name}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid container justifyContent={'space-between'} spacing={2}>
                <Grid item lg={7} fontSize={'1.1rem'}>
                  {superhero.hasOwnProperty("biography") ?
                    <>
                      <h2>Biography</h2>
                      {
                        Object.entries(superhero.biography).map((value) => (
                          <>
                            <Span>{value[0]}: {Array.isArray(value[1]) ? <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1][1]}</span> : <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1]}</span> } </Span>
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
                            <Span>{value[0]}: {Array.isArray(value[1]) ? <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1][1]}</span> : <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1]}</span>} </Span>
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
                            <Span>{value[0]}: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1]}</span> </Span>
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
                            <Span>{value[0]}: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1]}</span> </Span>
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
                            <Span>{value[0]}: <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>{value[1]}</span> </Span>
                            <br />
                          </>
                        ))
                      }
                    </>
                    : ""
                  }
                </Grid>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default SuperHeroModal;
