import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundError from './components/Errors/NotFoundError';
import Header from './components/Header/Header';
import Container from './components/UI/Container/Container';
import AddQuestionPage from './pages/AddQuestionPage';
import AnswersPage from './pages/AnswersPage';
import LoginPage from './pages/LoginPage';
import QuestionsPage from './pages/QuestionsPage';
import RegisterPage from './pages/RegisterPage';
import AuthContext from './store/authContext';

function App() {
  const [userEmail, setUserEmail] = useState('');

  function login(email) {
    console.log('logged in');
    setUserEmail(email);
  }

  function logout() {
    console.log('logout');
    setUserEmail(null);
  }

  const ctx = {
    login,
    logout,
    userEmail,
  };

  return (
    <AuthContext.Provider value={ctx}>
      <div className="App">
        <Header />
        <Container>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/add">
              <AddQuestionPage />
            </Route>
            <Route path="/:id/answers">
              <AnswersPage />
            </Route>
            <Route exact path="/">
              <QuestionsPage />
            </Route>
            <Route path="*">
              <NotFoundError />
            </Route>
          </Switch>
        </Container>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
