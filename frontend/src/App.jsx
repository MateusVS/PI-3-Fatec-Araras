import GlobalStyles from './styles/GlobalStyles';

import { NotificationContainer } from 'react-notifications';
import 'react-notifications/dist/react-notifications.css'

import Routes from './routes';

function App() {
  return (
    <>
      <GlobalStyles />
      <NotificationContainer />
      <Routes />
    </>
  );
}

export default App;
