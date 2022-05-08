import { BrowserRouter } from 'react-router-dom';

import Auth from './auth.routes';

function Routes() {
  return (
    <BrowserRouter>
      <Auth />
    </BrowserRouter>
  );
}

export default Routes;
