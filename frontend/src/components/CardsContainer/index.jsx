import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Card from '../Card';
import api from '../../services/api';

import { NotificationManager } from 'react-notifications';

import { Container, LoadError } from './styles';

function CardsContainer() {
  const [cardsList, setCardsList] = useState([]);

  useEffect(() => {
    async function loadServices() {
      await api.get('/superherois')
        .then(function (response) {
          setCardsList(response.data);
        })
        .catch(function (error) {
          NotificationManager.error(error.message, 'Error message', 2000);
        });
    }
    loadServices();
  }, []);

  useEffect(() => {}, [cardsList]);

  return (
    <Container>
      <Grid container spacing={2}>
        { cardsList.length > 0 ? cardsList.map(card => (
          <Grid item lg={2} md={4} sm={6} xs={12}>
            <Card key={card.id} name={card.name} image={card.images.lg} />
          </Grid>
        )) :
        (<LoadError>
          An error occurred while loading the page. Please try again!
        </LoadError>) }
      </Grid>
    </Container>
  );
}

export default CardsContainer;
