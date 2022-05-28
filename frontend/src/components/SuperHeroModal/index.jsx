import { useState, useEffect } from 'react';

import api from '../../services/api';
import { Box, Typography, Modal } from '@mui/material';

import { NotificationManager } from 'react-notifications';

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

function SuperHeroModal({open, handleClose}) {
  const [superhero, setSuperhero] = useState();

  useEffect(() => {
    api.get('/')
      .then(function (response) {

      })
      .catch(function (error) {
        NotificationManager.error(error.message, 'Error message', 2000);
      });
    setOpen(true);
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}

export default SuperHeroModal;
