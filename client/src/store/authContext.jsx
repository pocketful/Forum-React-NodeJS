import { createContext } from 'react';

// arguments for autocomplete
const AuthContext = createContext({
  isLoggedIn: false,
  login() {},
  logout() {},
  userEmail: null,
});

AuthContext.displayName = 'AuthContext';

export default AuthContext;
