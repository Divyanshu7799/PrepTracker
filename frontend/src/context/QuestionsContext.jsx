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

  "http://localhost:5000/questions",

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

      `http://localhost:5000/questions/${questionId}`,

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

const deleteQuestion = async (
  questionId
) => {

  try {

    const response = await fetch(

      `http://localhost:5000/questions/${questionId}`,

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