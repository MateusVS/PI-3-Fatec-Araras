import { useState, useEffect } from 'react';
import Card from '../Card';
import api from '../../services/api';

import { NotificationManager } from 'react-notifications';

import { Container } from './styles';

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
      { cardsList ? cardsList.map(card => (
        <Card key={card.id} name={card.name} image={card.images.lg} />
      )) : (<div> Teste </div>) }

    </Container>
  );
}

export default CardsContainer;
