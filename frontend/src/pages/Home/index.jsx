import NavBar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import CardsContainer from '../../components/CardsContainer';
import Footer from '../../components/footer';

import { Container } from './styles';

function Home() {
  return (
    <>
      <NavBar />
      <Container>
        <SearchBar />
        <CardsContainer />
      </Container>
      <Footer />
    </>
  );
}

export default Home;
