import { Route, Switch } from 'react-router-dom';
import AddQuestionPage from './pages/AddQuestionPage';
import AnswersPage from './pages/AnswersPage';
import NotFoundPage from './pages/ErrorPages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import QuestionsPage from './pages/QuestionsPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="App">
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
            <NotFoundPage />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
