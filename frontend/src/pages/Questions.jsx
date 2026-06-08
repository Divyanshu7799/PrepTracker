import {
  useContext,
  useState
} from "react";

import QuestionsContext from "../context/QuestionsContext";

import DashboardLayout from "../layouts/DashboardLayout";
import QuestionCard from "../components/QuestionCard";

function Questions() {

  // GET GLOBAL STATE
  const { questions, markSolved ,deleteQuestion} = useContext(QuestionsContext);
  const [formData, setFormData] = useState({

  title: "",
  topic: "",
  difficulty: ""

});

const today = new Date().toISOString()
  .split("T")[0];


const todaysQuestions = questions

  .filter((question) => {

    const questionDate =
      new Date(question.created_at)
        .toISOString()
        .split("T")[0];

    return questionDate === today;

  })

  .sort((a, b) => {

    return a.solved - b.solved;

  });





const previousQuestions = questions

  .filter((question) => {

    const questionDate =
      new Date(question.created_at)
        .toISOString()
        .split("T")[0];

    return questionDate !== today;

  })

  .sort((a, b) => {

    return a.solved - b.solved;

  });



const handleAddQuestion = async () => {

  try {

    const response = await fetch(

      "https://preptracker-d9k6.onrender.com/questions/add",

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          Authorization:
            localStorage.getItem("token")

        },

        body: JSON.stringify(formData)

      }

    );


    const data = await response.text();

    console.log(data);


    window.location.reload();

  }

  catch (error) {

    console.log(error);

  }

};


const handleChange = (e) => {

  setFormData({

    ...formData,

    [e.target.name]: e.target.value

  });

};


  return (

    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-10">
        Questions
      </h1>

<div className="
  bg-[#111827]
  border
  border-white/10
  rounded-3xl
  p-8
  shadow-2xl
  mb-12
">

  {/* Header */}

  <div className="mb-8">

    <h2 className="
      text-3xl
      font-bold
      text-white
      mb-2
    ">

      Add Question

    </h2>


    <p className="
      text-gray-400
    ">

      Track your daily coding goals

    </p>

  </div>


  {/* Form */}

  <div className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-4
  ">

    {/* Title */}

    <input
      type="text"
      name="title"
      placeholder="Question Title"
      value={formData.title}
      onChange={handleChange}
      className="
        bg-[#0f172a]
        border
        border-white/10
        rounded-2xl
        px-5
        py-4
        outline-none
        focus:border-blue-400
        transition
      "
    />


    {/* Topic */}

    <input
      type="text"
      name="topic"
      placeholder="Topic"
      value={formData.topic}
      onChange={handleChange}
      className="
        bg-[#0f172a]
        border
        border-white/10
        rounded-2xl
        px-5
        py-4
        outline-none
        focus:border-blue-400
        transition
      "
    />


    {/* Difficulty */}

    <select
      name="difficulty"
      value={formData.difficulty}
      onChange={handleChange}
      className="
        bg-[#0f172a]
        border
        border-white/10
        rounded-2xl
        px-5
        py-4
        outline-none
        focus:border-blue-400
        transition
      "
    >

      <option value="">
        Select Difficulty
      </option>

      <option value="Easy">
        Easy
      </option>

      <option value="Medium">
        Medium
      </option>

      <option value="Hard">
        Hard
      </option>

    </select>

  </div>


  {/* Button */}

  <button

    onClick={handleAddQuestion}

    className="
      mt-6
      bg-gradient-to-r
      from-blue-500
      to-cyan-400
      hover:scale-[1.02]
      transition-all
      duration-300
      px-8
      py-4
      rounded-2xl
      font-semibold
      shadow-lg
    "
  >

    Add Question

  </button>

</div>

{/* Today's Questions */}

<div className="mb-14">

  <div className="
    flex
    items-center
    justify-between
    mb-6
  ">

    <h2 className="
      text-3xl
      font-bold
      text-white
    ">

      Today's Questions 🚀

    </h2>


    <span className="
      text-sm
      text-gray-400
    ">

      {todaysQuestions.length} Questions

    </span>

  </div>


  <div className="
    flex
    flex-col
    gap-6
  ">

    {
      todaysQuestions.map((question) => (

        <QuestionCard
          key={question.id}
          title={question.title}
          topic={question.topic}
          difficulty={question.difficulty}
          solved={question.solved}

          onSolve={() =>
            markSolved(question.id)
          }

          onDelete={() =>
            deleteQuestion(question.id)
          }
        />

      ))
    }

  </div>

</div>


{/* Previous Questions */}

<div>

  <div className="
    flex
    items-center
    justify-between
    mb-6
  ">

    <h2 className="
      text-3xl
      font-bold
      text-white
    ">

      Previous Questions 📚

    </h2>


    <span className="
      text-sm
      text-gray-400
    ">

      {previousQuestions.length} Questions

    </span>

  </div>


  <div className="
    flex
    flex-col
    gap-6
  ">

    {
      previousQuestions.map((question) => (

        <QuestionCard
          key={question.id}
          title={question.title}
          topic={question.topic}
          difficulty={question.difficulty}
          solved={question.solved}

          onSolve={() =>
            markSolved(question.id)
          }

          onDelete={() =>
            deleteQuestion(question.id)
          }
        />

      ))
    }

  </div>

</div>





    </DashboardLayout>

  );
}

export default Questions;