import { createContext, useState, useContext } from 'react';

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(() => {
    const isLogged = localStorage.getItem('@superhero:logged');

    return !!isLogged;
  });

  const SignIn = (email, password) => {
    return api.post('/login', { email, password })
            .then((response) => {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error)
            });

    // useCallback(() => {
    //   async function loadServices() {
    //     await api.post('/login', { email, password})
    //       .then(function (response) {
    //         console.log(response.data);
    //       })
    //       .catch(function (error) {
    //         console.log(error)
    //       });
    //   }
    //   loadServices();
    // }, [email, password]);

    // if (email === 'mateusviniciussilva07@gmail.com' && password === '123') {
    //   localStorage.setItem('@superhero:logged', 'true');
    //   setLogged(true);
    // } else {
    //   alert('Senha ou usuário inválidos!');
    // }
  }

  const SignOut = () => {
    localStorage.removeItem('@superhero:logged');
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
