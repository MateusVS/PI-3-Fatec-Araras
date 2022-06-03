import { useState, useEffect } from 'react';

import api from '../../services/api';

import { NotificationManager } from 'react-notifications';
import { Box, Typography, Modal, Grid } from '@mui/material';

import { P, Span, Img } from './styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY:'scroll',
  height:'95%',
  display:'block'
};

function SuperHeroModal({open, heroId, handleClose}) {
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
        <Grid container spacing={2}>
          <Grid item lg={6} md={8} sm={10}>
            { superhero.hasOwnProperty("images") ? <Img src={superhero.images.lg} alt={superhero.name} /> : "" }
          </Grid>
          <Grid item lg={4} md={3} sm={10}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              {superhero.name}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <P>
                { superhero.hasOwnProperty("biography") ?
                  <>
                    <h3>Biography</h3>
                    {
                      Object.entries(superhero.biography).map((value) => (
                        <>
                          <Span>{ value[0] }: { Array.isArray(value[1]) ? value[1][1] : value[1] } </Span>
                          <br />
                        </>
                      ))
                    }
                  </>
                  : ""
                }
              </P>
              <P>
                { superhero.hasOwnProperty("appearance") ?
                  <>
                    <h3>Appearance</h3>
                    {
                      Object.entries(superhero.appearance).map((value) => (
                        <>
                          <Span>{ value[0] }: { Array.isArray(value[1]) ? value[1][1] : value[1] } </Span>
                          <br />
                        </>
                      ))
                    }
                  </>
                  : ""
                }
              </P>
              <P>
                { superhero.hasOwnProperty("powerstats") ?
                  <>
                    <h3>Powerstats</h3>
                    {
                      Object.entries(superhero.powerstats).map((value) => (
                        <>
                          <Span>{ value[0] }: { value[1] } </Span>
                          <br />
                        </>
                      ))
                    }
                  </>              
                  : ""
                }
              </P>
              <P>
                { superhero.hasOwnProperty("work") ?
                  <>
                    <h3>Work</h3>
                    {
                      Object.entries(superhero.work).map((value) => (
                        <>
                          <Span>{ value[0] }: { value[1] } </Span>
                          <br />
                        </>
                      ))
                    }
                  </>
                  : ""
                }
              </P>
              <P>
                { superhero.hasOwnProperty("connections") ?
                  <>            
                    <h3>Connections</h3>
                    {
                      Object.entries(superhero.connections).map((value) => (
                        <>
                          <Span>{ value[0] }: { value[1] } </Span>
                          <br />
                        </>
                      ))
                    }
                  </>
                  : ""
                }
              </P>
            </Typography>
          </Grid>
        </Grid>        
      </Box>
    </Modal>
  );
}

export default SuperHeroModal;
