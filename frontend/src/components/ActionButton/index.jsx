import { useState } from 'react';

import { Box, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

import RegistrationModal from '../RegistrationModal';

function ActionButton({ cardsList }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab
          color="error"
          aria-label="add"
          sx={{ margin: '0px', top: 'auto', right: '20px', bottom: '20px', left: 'auto', position: 'fixed' }}
          onClick={() => handleOpen()}
          >
          <Add />
        </Fab>
      </Box>
      <RegistrationModal open={open} cardsList={cardsList} handleOpen={handleOpen} />
    </>
  );
}

export default ActionButton;
