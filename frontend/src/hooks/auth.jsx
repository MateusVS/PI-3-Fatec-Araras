import { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(() => {
    const isLogged = localStorage.getItem('@superhero:logged');

    return !!isLogged;
  });

  const SignIn = (email, password) => {
    if (email === 'mateusviniciussilva07@gmail.com' && password === '123') {
      localStorage.setItem('@superhero:logged', 'true');
      alert("Logou")
      setLogged(true);
    } else {
      alert('Senha ou usuário inválidos!');
    }
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
