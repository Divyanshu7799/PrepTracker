import {
  createContext,
  useState,
  useEffect
} from "react";
const QuestionsContext = createContext();

function QuestionsProvider({ children }) {

  const [questions, setQuestions] = useState([]);

useEffect(() => {

fetch(

  "https://preptracker-d9k6.onrender.com/questions",

  {

    headers: {

      Authorization:
        localStorage.getItem("token")

    }

  }

).then((response) => response.json())

    .then((data) => {

      setQuestions(data);

    })

    .catch((error) => {

      console.log(error);

    });

}, []);


const markSolved = async (questionId) => {

  try {

    const currentQuestion = questions.find(
      (question) => question.id === questionId
    );


    const updatedSolvedState =
      !currentQuestion.solved;


    const response = await fetch(

      `https://preptracker-d9k6.onrender.com/questions/${questionId}`,

      {

        method: "PUT",

        headers: {

          "Content-Type": "application/json",

          Authorization:
            localStorage.getItem("token")

        },

        body: JSON.stringify({

          solved: updatedSolvedState

        })

      }

    );


    const data = await response.text();

    console.log(data);


    const updatedQuestions = questions.map(
      (question) => {

        if (question.id === questionId) {

          return {

            ...question,

            solved: updatedSolvedState

          };

        }

        return question;

      }
    );


    setQuestions(updatedQuestions);

  }

  catch (error) {

    console.log(error);

  }

};
const addQuestion = async (questionData) => {
  try {
    const response = await fetch(
      "https://preptracker-d9k6.onrender.com/questions/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify(questionData)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to add question"
      };
    }

    const newQuestion = {
      id: data.id,
      user_id: null,
      title: questionData.title,
      topic: questionData.topic,
      difficulty: questionData.difficulty,
      solved: false,
      solved_at: null,
      revision_stage: 0,
      next_revision_date: null,
      created_at: new Date().toISOString()
    };

    setQuestions((prevQuestions) => [
      newQuestion,
      ...prevQuestions
    ]);

    return {
      success: true,
      message: data.message
    };

  } catch (error) {
    console.error("Add question error:", error);

    return {
      success: false,
      message: "Something went wrong"
    };
  }
};
const deleteQuestion = async (
  questionId
) => {

  try {

    const response = await fetch(

      `https://preptracker-d9k6.onrender.com/questions/${questionId}`,

      {

        method: "DELETE",

        headers: {

          Authorization:
            localStorage.getItem("token")

        }

      }

    );


    const data = await response.text();

    console.log(data);


    const updatedQuestions =
      questions.filter(

        (question) =>
          question.id !== questionId

      );


    setQuestions(updatedQuestions);

  }

  catch (error) {

    console.log(error);

  }

};






  return (

  <QuestionsContext.Provider
  value={{
    questions,
    addQuestion,
    markSolved,
    deleteQuestion
  }}
>

      {children}

    </QuestionsContext.Provider>

  );
}

export { QuestionsProvider };

export default QuestionsContext;