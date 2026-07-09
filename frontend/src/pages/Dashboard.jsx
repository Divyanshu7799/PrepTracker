import { useContext } from "react";

import QuestionsContext from "../context/QuestionsContext";
import MomentumGraph
from "../components/MomentumGraph";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

function RevisionSection() {
  const [dueQuestions, setDueQuestions] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/questions/revisions/due`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setDueQuestions(data))
      .catch((err) => console.log(err));
  }, []);

  if (dueQuestions.length === 0) return null;

  return (
    <div className="mt-10 bg-[#111827] border border-yellow-400/20 rounded-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-yellow-300 mb-2">
        🔁 Due for Revision Today
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        {dueQuestions.length} question{dueQuestions.length > 1 ? "s" : ""} scheduled for revision
      </p>
      <div className="flex flex-col gap-3">
        {dueQuestions.map((q) => (
          <div key={q.id}
            className="flex items-center justify-between bg-[#0f172a] rounded-2xl px-5 py-4 border border-white/5">
            <div>
              <p className="font-semibold text-white">{q.title}</p>
              <p className="text-xs text-gray-400 mt-1">{q.topic} · {q.difficulty}</p>
            </div>
            <span className="text-yellow-400 text-xs font-medium">
              Revision #{q.revision_stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
function Dashboard() {

  const { questions } = useContext(QuestionsContext);
 const today = new Date()
  .toISOString()
  .split("T")[0];
  const totalSolved = questions.filter(
    (question) => question.solved
  ).length;

  const easySolved = questions.filter(
    (question) =>
      question.solved &&
      question.difficulty === "Easy"
  ).length;

  const mediumSolved = questions.filter(
    (question) =>
      question.solved &&
      question.difficulty === "Medium"
  ).length;

  const hardSolved = questions.filter(
    (question) =>
      question.solved &&
      question.difficulty === "Hard"
  ).length;

const todaysQuestions = questions.filter(
  (question) => {

    const questionDate =
      new Date(question.created_at)
        .toISOString()
        .split("T")[0];

    return questionDate === today;

  }
);


const todaysSolved = todaysQuestions.filter(
  (question) => question.solved
).length;


const todaysTarget =
  todaysQuestions.length;


const completionPercentage =

  todaysTarget === 0

    ? 0

    : Math.floor(

        (todaysSolved / todaysTarget)
        * 100

      );

const solvedDates = [

  ...new Set(

    questions

      .filter((question) =>
        question.solved
      )

      .map((question) =>

        new Date(question.created_at)
          .toISOString()
          .split("T")[0]

      )

  )

];


const streakCount =
  solvedDates.length;



  return (

    <DashboardLayout >

      <div>

        <h1 className="text-4xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-gray-400 mb-10">
          Track your placement preparation progress 🚀
        </p>


{/* Cards Section */}

<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  xl:grid-cols-3
  gap-6
">

  <DashboardCard
    title="Total Solved"
    count={totalSolved}
  />

  <DashboardCard
    title="Easy Questions"
    count={easySolved}
  />

  <DashboardCard
    title="Medium Questions"
    count={mediumSolved}
  />

  <DashboardCard
    title="Hard Questions"
    count={hardSolved}
  />

  <DashboardCard
    title="Today's Progress"
    count={`${todaysSolved}/${todaysTarget}`}
  />

  <DashboardCard
    title="Completion"
    count={`${completionPercentage}%`}
  />
   
</div>

{/* Revision Due Today */}
<RevisionSection />
{/* Bottom Section */}

<div className="
  flex
  flex-col
  gap-8
  mt-10
">

  {/* Streak */}

  <DashboardCard
    title="🔥 Streak"
    count={`${streakCount} Days`}
  />


  {/* Momentum Graph */}

  <MomentumGraph
    questions={questions}
  />

</div>


      </div>

    </DashboardLayout>
  );
}

export default Dashboard;