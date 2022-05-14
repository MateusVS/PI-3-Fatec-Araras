import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import Auth from './auth.routes';
import App from './app.routes';

function Routes() {
  const { logged } = useAuth();
  return (
    <BrowserRouter>
      { logged ? <App /> : <Auth /> }
    </BrowserRouter>
  );
}

export default Routes;
