import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getFetch } from "../helpers/fetch";
import { useAuthCtx } from "../store/authContext";

function QuestionsPage() {
  const [questionsArr, setQuestionsArr] = useState([]);

  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.replace('/login');

  async function getQuestions() {
    try {
      const data = await getFetch('/questions', token);
      console.log('data:', data);
      setQuestionsArr(data);
    } catch (err) {
      console.log('error in getQuestions: ', err);
    }
  }

  useEffect(() => {
    if (token) getQuestions();
  }, []);

  return (
    <>
      <h1>Questions</h1>
    </>
  );
}

export default QuestionsPage;
