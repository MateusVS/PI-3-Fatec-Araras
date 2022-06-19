import { Modal, Box, Grid } from '@mui/material';

import RegistrationForm from '../RegistrationForm';

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

function RegistrationModal({ open, cardsList, handleOpen }) {
  return (
    <Modal
      open={open}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item lg={12} sx={{ textAlign: 'center' }}>
            <h1>Custom Registration</h1>
          </Grid>
          <br/>
          <Grid item lg={12}>
            <RegistrationForm cardsList={cardsList} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default RegistrationModal;
