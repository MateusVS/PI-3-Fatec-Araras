import { useState, useEffect } from 'react';

import api from '../../services/api';

import { NotificationManager } from 'react-notifications';

import NavBar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import CardsContainer from '../../components/CardsContainer';
import Footer from '../../components/footer';
import ActionButton from '../../components/ActionButton';

import { Container } from './styles';

function Home() {
  const [cardsList, setCardsList] = useState([]);
  const [OriginalcardsList, setOriginalCardsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      if (window.location.href.toString().includes('/custom-heroes')) {
        await api.get(`/users/${localStorage.getItem('@superhero:user_id')}`)
          .then(function (response) {
            setCardsList(response.data);
            setOriginalCardsList(response.data);
          })
          .catch(function (error) {
            NotificationManager.error(error.message, 'Error message', 2000);
          });
      } else {
        await api.get('/superheroes')
          .then(function (response) {
            setCardsList(response.data);
            setOriginalCardsList(response.data);
          })
          .catch(function (error) {
            NotificationManager.error(error.message, 'Error message', 2000);
          });
      }
      setIsLoading(false);
    }
    loadServices();
  }, [window.location.href.toString()]);

  useEffect(() => {}, [cardsList]);

  const handleSearch = (e) => {
    let newCardList = window.location.href.toString().includes('/custom-heroes') ?
                      OriginalcardsList.filter((card) => card.fullName.toUpperCase().includes(e.target.value.toUpperCase())) :
                      OriginalcardsList.filter((card) => card.name.toUpperCase().includes(e.target.value.toUpperCase()));

    setCardsList(newCardList);
  }

  return (
    <>
      <NavBar />
      <Container>
        <SearchBar searchFunction={handleSearch} />
        <CardsContainer cardsList={cardsList} isLoading={isLoading} />
      </Container>
      <ActionButton cardsList={cardsList} />
      <Footer />
    </>
  );
}

export default Home;
