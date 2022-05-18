import { useState, useEffect } from 'react';
import Card from '../Card';
import api from '../../services/api';

import { Container } from './styles';

function CardsContainer() {

  useEffect(() => {
    async function loadServices() {
      await api.get('/superherois')
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error)
        });
    }
    loadServices();
  }, []);

  return (
    <Container>
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
  );
}

export default CardsContainer;
