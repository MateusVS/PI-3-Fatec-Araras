import NavBar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';

import CardsContainer from '../../components/CardsContainer';

import { Container } from './styles';

function Home() {
  return (
    <>
      <NavBar />
      <Container>
        <SearchBar />
        <CardsContainer />
        Home Page
      </Container>
    </>
  );
}

export default Home;
