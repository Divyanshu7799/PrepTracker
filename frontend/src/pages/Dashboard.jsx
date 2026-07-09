import { useContext, useState, useEffect } from "react";
import QuestionsContext from "../context/QuestionsContext";
import MomentumGraph from "../components/MomentumGraph";
import DashboardLayout from "../layouts/DashboardLayout";
import { API_URL } from "../config/api";

const TOPIC_ORDER = [
  "Array", "String", "LinkedList", "Stack", "Queue",
  "Tree", "Graph", "Recursion", "Dynamic Programming",
  "Greedy", "Backtracking", "Sorting", "Searching",
  "Hashing", "Heap", "Bit Manipulation",
];

function StatCard({ label, value, sub, accent }) {
  const accents = {
    blue:   "from-blue-500 to-cyan-400",
    green:  "from-emerald-500 to-teal-400",
    yellow: "from-yellow-400 to-orange-400",
    red:    "from-rose-500 to-pink-400",
    purple: "from-violet-500 to-purple-400",
  };
  return (
    <div className="bg-[#111827] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300">
      <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-3">{label}</p>
      <p className={`text-3xl font-extrabold bg-gradient-to-r ${accents[accent] || accents.blue} text-transparent bg-clip-text`}>
        {value}
      </p>
      {sub && <p className="text-gray-500 text-xs mt-2">{sub}</p>}
    </div>
  );
}

function TopicBar({ topic, solved, total }) {
  const pct = total === 0 ? 0 : Math.round((solved / total) * 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-300 font-medium">{topic}</span>
        <span className="text-xs text-gray-500">{solved}/{total}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function RevisionSection() {
  const [dueQuestions, setDueQuestions] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/questions/revisions/due`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setDueQuestions(data))
      .catch((err) => console.log(err));
  }, []);

  if (dueQuestions.length === 0) return null;

  return (
    <div className="bg-[#111827] border border-yellow-400/25 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">🔁</span>
        <div>
          <h2 className="text-lg font-bold text-white">Due for Revision</h2>
          <p className="text-gray-400 text-xs">
            {dueQuestions.length} question{dueQuestions.length > 1 ? "s" : ""} scheduled today
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {dueQuestions.map((q) => (
          <div key={q.id}
            className="flex items-center justify-between bg-[#0f172a] rounded-xl px-4 py-3 border border-white/5">
            <div>
              <p className="font-semibold text-white text-sm">{q.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{q.topic} · {q.difficulty}</p>
            </div>
            <span className="text-yellow-400 text-xs font-semibold bg-yellow-400/10 px-3 py-1 rounded-full">
              Rev #{q.revision_stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const { questions } = useContext(QuestionsContext);

  const today = new Date().toISOString().split("T")[0];

  const totalSolved  = questions.filter((q) => q.solved).length;
  const totalQuestions = questions.length;
  const easySolved   = questions.filter((q) => q.solved && q.difficulty === "Easy").length;
  const mediumSolved = questions.filter((q) => q.solved && q.difficulty === "Medium").length;
  const hardSolved   = questions.filter((q) => q.solved && q.difficulty === "Hard").length;

  const todaysQuestions = questions.filter((q) => {
    const d = new Date(q.created_at).toISOString().split("T")[0];
    return d === today;
  });
  const todaysSolved = todaysQuestions.filter((q) => q.solved).length;
  const completionPct = todaysQuestions.length === 0
    ? 0
    : Math.floor((todaysSolved / todaysQuestions.length) * 100);

  // Streak — consecutive days with at least one solved question
  const solvedDays = [
    ...new Set(
      questions
        .filter((q) => q.solved)
        .map((q) => new Date(q.created_at).toISOString().split("T")[0])
    ),
  ].sort((a, b) => (a > b ? -1 : 1));

  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  for (const day of solvedDays) {
    const cursorStr = cursor.toISOString().split("T")[0];
    if (day === cursorStr) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }

  // Topic-wise stats
  const topicStats = {};
  questions.forEach((q) => {
    if (!q.topic) return;
    if (!topicStats[q.topic]) topicStats[q.topic] = { solved: 0, total: 0 };
    topicStats[q.topic].total++;
    if (q.solved) topicStats[q.topic].solved++;
  });

  const topicsWithData = TOPIC_ORDER.filter((t) => topicStats[t]);

  // Weak topics — solved less than 50%
  const weakTopics = topicsWithData.filter((t) => {
    const { solved, total } = topicStats[t];
    return total > 0 && (solved / total) < 0.5;
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-1">Dashboard</h1>
          <p className="text-gray-400 text-sm">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Today's Target</p>
          <p className="text-2xl font-extrabold text-white">
            {todaysSolved}
            <span className="text-gray-500 font-normal text-lg">/{todaysQuestions.length}</span>
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total Solved"   value={`${totalSolved}/${totalQuestions}`} accent="blue" />
        <StatCard label="🔥 Streak"      value={`${streak}d`} sub="consecutive days" accent="yellow" />
        <StatCard label="Easy"           value={easySolved}   accent="green" />
        <StatCard label="Medium"         value={mediumSolved} accent="yellow" />
        <StatCard label="Hard"           value={hardSolved}   accent="red" />
      </div>

      {/* Today's Completion Bar */}
      <div className="bg-[#111827] border border-white/10 rounded-2xl p-5 mb-8">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-white">Today's Completion</p>
          <p className={`text-sm font-bold ${completionPct === 100 ? "text-emerald-400" : "text-blue-400"}`}>
            {completionPct}%
          </p>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              completionPct === 100
                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                : "bg-gradient-to-r from-blue-500 to-cyan-400"
            }`}
            style={{ width: `${completionPct}%` }}
          />
        </div>
        {completionPct === 100 && (
          <p className="text-emerald-400 text-xs mt-2 font-medium">🎉 All done for today!</p>
        )}
      </div>

      {/* Main grid — Graph + Topics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Momentum Graph */}
        <MomentumGraph questions={questions} />

        {/* Topic Progress */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-1">Topic Progress</h2>
          <p className="text-gray-400 text-xs mb-5">Solved vs added per topic</p>
          {topicsWithData.length === 0 ? (
            <p className="text-gray-500 text-sm">No questions added yet.</p>
          ) : (
            topicsWithData.map((topic) => (
              <TopicBar
                key={topic}
                topic={topic}
                solved={topicStats[topic].solved}
                total={topicStats[topic].total}
              />
            ))
          )}
        </div>
      </div>

      {/* Weak Topics Warning */}
      {weakTopics.length > 0 && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 mb-8">
          <p className="text-rose-300 font-semibold text-sm mb-2">⚠️ Needs Attention</p>
          <div className="flex flex-wrap gap-2">
            {weakTopics.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Revision Due */}
      <RevisionSection />

    </DashboardLayout>
  );
}

export default Dashboard;
