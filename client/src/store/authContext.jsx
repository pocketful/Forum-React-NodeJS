import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  login() { },
  logout() { },
  userEmail: null,
  token: null,
});

AuthContext.displayName = 'AuthContext';

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));

  function login(userToken, email) {
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('userEmail', email);
    setUserEmail(email);
    setToken(userToken);
  }

  function logout() {
    // localStorage.removeItem('userToken');
    // localStorage.removeItem('userEmail');
    localStorage.clear();
    setUserEmail(null);
    setToken(null);
  }

  const ctx = {
    isLoggedIn: !!token,
    login,
    logout,
    userEmail,
    token,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}

// custom hook for auth context
export function useAuthCtx() {
  return useContext(AuthContext);
}

export default AuthProvider;
