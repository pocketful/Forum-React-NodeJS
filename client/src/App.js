import { Route, Switch } from 'react-router-dom';
import NotFoundError from './components/Errors/NotFoundError';
import Header from './components/Header/Header';
import Container from './components/UI/Container/Container';
import AddQuestionPage from './pages/AddQuestionPage';
import AnswersPage from './pages/AnswersPage';
import LoginPage from './pages/LoginPage';
import QuestionsPage from './pages/QuestionsPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
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
  );
}

export default App;
