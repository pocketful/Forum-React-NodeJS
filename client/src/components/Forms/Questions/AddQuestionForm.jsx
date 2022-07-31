import Button from '../../UI/Button/Button';
import style from '../User/UserForm.module.css';

function AddQuestionForm() {
  return (
    <>
      <h2>Ask a public question</h2>
      <form className={style.wrapper}>
        <div className={style.group}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className={style.input}
          />
        </div>
        <div className={style.group}>
          <textarea
            name="content"
            placeholder="Content"
            className={`${style.input} ${style.textarea}`}
          />
        </div>
        <div className={style.group}>
          <Button>Post your question</Button>
        </div>
      </form>
    </>
  );
}

export default AddQuestionForm;
