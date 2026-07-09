import { useContext, useState } from "react";
import QuestionsContext from "../context/QuestionsContext";
import DashboardLayout from "../layouts/DashboardLayout";
import QuestionCard from "../components/QuestionCard";

const TOPICS = [
  "Array", "String", "LinkedList", "Stack", "Queue",
  "Tree", "Graph", "Recursion", "Dynamic Programming",
  "Greedy", "Backtracking", "Sorting", "Searching",
  "Hashing", "Heap", "Bit Manipulation", "Other",
];

function Questions() {
  const { questions, addQuestion, markSolved, deleteQuestion } = useContext(QuestionsContext);
  const [formData, setFormData] = useState({ title: "", topic: "", difficulty: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddQuestion = async () => {
    setErrorMessage("");
    if (!formData.title || !formData.topic || !formData.difficulty) {
      setErrorMessage("Please fill all fields");
      return;
    }
    setIsSubmitting(true);
    const result = await addQuestion(formData);
    setIsSubmitting(false);
    if (!result.success) { setErrorMessage(result.message || "Something went wrong"); return; }
    setFormData({ title: "", topic: "", difficulty: "" });
  };

  const applyFilters = (list) => list
    .filter((q) => !filterTopic || q.topic === filterTopic)
    .filter((q) => !filterDifficulty || q.difficulty === filterDifficulty)
    .sort((a, b) => a.solved - b.solved);

  const todaysQuestions = applyFilters(
    questions.filter((q) => new Date(q.created_at).toISOString().split("T")[0] === today)
  );

  const previousQuestions = applyFilters(
    questions.filter((q) => new Date(q.created_at).toISOString().split("T")[0] !== today)
  );

  const inputClass = "bg-[#0d1117] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400/50 transition text-white placeholder-gray-500";

  return (
    <DashboardLayout>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-1">Questions</h1>
          <p className="text-gray-400 text-sm">Track and solve your daily DSA targets</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
          <p className="text-2xl font-extrabold text-white">{questions.length}</p>
        </div>
      </div>

      {/* Add Question Form */}
      <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-base font-bold text-white mb-4">Add Question</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            type="text" name="title" placeholder="Question title"
            value={formData.title} onChange={handleChange}
            className={inputClass}
          />
          <select name="topic" value={formData.topic} onChange={handleChange} className={inputClass}>
            <option value="">Select Topic</option>
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select name="difficulty" value={formData.difficulty} onChange={handleChange} className={inputClass}>
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        {errorMessage && <p className="text-rose-400 text-xs mb-3">{errorMessage}</p>}
        <button
          onClick={handleAddQuestion} disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-2.5 rounded-xl text-sm font-semibold hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? "Adding..." : "+ Add Question"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)} className={`${inputClass} text-xs`}>
          <option value="">All Topics</option>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className={`${inputClass} text-xs`}>
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        {(filterTopic || filterDifficulty) && (
          <button onClick={() => { setFilterTopic(""); setFilterDifficulty(""); }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-400 transition">
            Clear ✕
          </button>
        )}
      </div>

      {/* Today's Questions */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Today's Questions 🚀</h2>
          <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">{todaysQuestions.length} questions</span>
        </div>
        {todaysQuestions.length === 0 ? (
          <div className="text-center py-10 text-gray-600 border border-white/5 rounded-2xl">
            <p className="text-3xl mb-2">📭</p>
            <p className="text-sm">No questions for today yet. Add one above!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {todaysQuestions.map((q) => (
              <QuestionCard key={q.id} title={q.title} topic={q.topic}
                difficulty={q.difficulty} solved={q.solved}
                nextRevisionDate={q.next_revision_date}
                onSolve={() => markSolved(q.id)}
                onDelete={() => deleteQuestion(q.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Previous Questions */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Previous Questions 📚</h2>
          <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">{previousQuestions.length} questions</span>
        </div>
        {previousQuestions.length === 0 ? (
          <div className="text-center py-10 text-gray-600 border border-white/5 rounded-2xl">
            <p className="text-sm">No previous questions.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {previousQuestions.map((q) => (
              <QuestionCard key={q.id} title={q.title} topic={q.topic}
                difficulty={q.difficulty} solved={q.solved}
                nextRevisionDate={q.next_revision_date}
                onSolve={() => markSolved(q.id)}
                onDelete={() => deleteQuestion(q.id)}
              />
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default Questions;
