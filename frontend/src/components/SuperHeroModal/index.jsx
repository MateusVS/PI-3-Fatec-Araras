import { useState, useEffect } from 'react';

import api from '../../services/api';

import { NotificationManager } from 'react-notifications';
import { Box, Typography, Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
        { superhero.hasOwnProperty("images") ? <img src={superhero.images.sm} alt={superhero.name} /> : "" }
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {superhero.name}
        </Typography>
        {/* <span>{superhero.appearance.gender}</span> */}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          { superhero.hasOwnProperty("biography") ?
            <h3>Biography</h3>

            : ""
          }

          { superhero.hasOwnProperty("appearance") ?
            <h3>Appearance</h3>

            : ""
          }

          { superhero.hasOwnProperty("powerstats") ?
            <h3>Powerstats</h3>

            : ""
          }

          { superhero.hasOwnProperty("work") ?
            <h3>Work</h3>

            : ""
          }

          { superhero.hasOwnProperty("connections") ?
            <h3>Connections</h3>

            : ""
          }
        </Typography>
      </Box>
    </Modal>
  );
}

export default SuperHeroModal;
