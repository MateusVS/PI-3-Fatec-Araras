import { createContext, useState, useContext } from 'react';

import api from '../services/api';

import { NotificationManager } from 'react-notifications';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(() => {
    const isLogged = localStorage.getItem('@superhero:logged');

    return !!isLogged;
  });

  const SignIn = async (email, password) => {
    await api.post('/usuarios/login', { email, password })
            .then((response) => {
              localStorage.setItem('@superhero:logged', 'true');
              localStorage.setItem('@superhero:user_id', response.data.id);
              setLogged(true);
            })
            .catch(function (error) {
              NotificationManager.error(error.message, 'Error', 2000);
            });
  }

  const SignOut = () => {
    localStorage.removeItem('@superhero:logged');
    localStorage.removeItem('@superhero:user_id');
    setLogged(false);
  }

  return (
    <AuthContext.Provider value={{logged, SignIn, SignOut}}>
      { children }
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
