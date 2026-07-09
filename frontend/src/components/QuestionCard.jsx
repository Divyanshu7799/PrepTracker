function QuestionCard({ title, topic, difficulty, solved, nextRevisionDate, onSolve, onDelete }) {
  const difficultyColors = {
    Easy:   "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    Medium: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
    Hard:   "bg-rose-500/15 text-rose-400 border border-rose-500/20",
  };

  const revisionText = nextRevisionDate
    ? `Revision due: ${new Date(nextRevisionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`
    : null;

  return (
    <div className={`bg-[#111827] border rounded-2xl p-5 transition-all duration-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4
      ${solved ? "border-emerald-500/15" : "border-white/10 hover:border-white/20"}`}>

      {/* Left */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {solved && <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />}
          <h2 className={`font-bold text-base truncate ${solved ? "text-gray-400 line-through" : "text-white"}`}>
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
          {topic && (
            <span className="px-3 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/15">
              {topic}
            </span>
          )}
          {revisionText && (
            <span className="px-3 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium border border-yellow-500/15">
              🔁 {revisionText}
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 shrink-0">
        <button onClick={onSolve}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
            ${solved
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25"
              : "bg-blue-500/15 text-blue-400 border border-blue-500/20 hover:bg-blue-500/25"
            }`}>
          {solved ? "✓ Solved" : "Mark Solved"}
        </button>
        <button onClick={onDelete}
          className="px-4 py-2 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/20 hover:bg-rose-500/25 transition-all duration-200 text-sm font-semibold">
          Delete
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
