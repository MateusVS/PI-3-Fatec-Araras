import { Grid, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import Card from '../Card';
import api from '../../services/api';

import { NotificationManager } from 'react-notifications';

import { Container, LoadError } from './styles';

function CardsContainer() {
  const [cardsList, setCardsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      await api.get('/superheroes')
        .then(function (response) {
          setCardsList(response.data);
        })
        .catch(function (error) {
          NotificationManager.error(error.message, 'Error message', 2000);
        });
      setIsLoading(false);
    }
    loadServices();
  }, []);

  useEffect(() => {}, [cardsList]);

  return (
    <Container>
      <div>
        { isLoading && <CircularProgress color="error" /> }
      </div>
      <Grid container spacing={2}>
        { cardsList.length > 0 ? cardsList.map(card => (
          <Grid item lg={2} md={4} sm={6} xs={12}>
            <Card key={card.id} name={card.name} image={card.images.lg} />
          </Grid>
        )) : (!isLoading && <LoadError>An error occurred while loading the page. Please try again!</LoadError>) }
      </Grid>
    </Container>
  );
}

export default CardsContainer;
