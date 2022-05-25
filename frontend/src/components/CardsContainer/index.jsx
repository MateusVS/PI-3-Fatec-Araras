import { useState } from 'react';

import { Grid, CircularProgress } from '@mui/material';
import Card from '../Card';

import { Container, LoadError } from './styles';

import Modal from '../SuperHeroModal';

function CardsContainer({ cardsList, isLoading }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <div>
        { isLoading && <CircularProgress color="error" /> }
      </div>
      <Grid container spacing={2}>
        { cardsList.length > 0 ? cardsList.map(card => (
          <Grid item lg={2} md={4} sm={6} xs={12} key={card.id}>
            <Card name={card.name} image={card.images.lg} handleOpen={handleOpen} />
          </Grid>
        )) : (!isLoading && <LoadError>An error occurred while loading the page. Please try again!</LoadError>) }
      </Grid>
      <Modal open={open} handleClose={handleClose} />
    </Container>
  );
}

export default CardsContainer;
