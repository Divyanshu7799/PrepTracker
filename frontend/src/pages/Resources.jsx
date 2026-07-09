import { useContext, useState } from "react";
import ResourcesContext from "../context/ResourcesContext";
import DashboardLayout from "../layouts/DashboardLayout";

const TOPICS = [
  "Array", "String", "LinkedList", "Stack", "Queue",
  "Tree", "Graph", "Recursion", "Dynamic Programming",
  "Greedy", "Backtracking", "Sorting", "Searching",
  "Hashing", "Heap", "Bit Manipulation", "OS", "DBMS",
  "CN", "System Design", "Other"
];

const TYPE_COLORS = {
  video:   "bg-purple-500/20 text-purple-300",
  article: "bg-blue-500/20 text-blue-300",
  pdf:     "bg-red-500/20 text-red-300",
  note:    "bg-yellow-500/20 text-yellow-300",
};

const TYPE_ICONS = {
  video: "▶",
  article: "📄",
  pdf: "📕",
  note: "📝",
};

function Resources() {
  const { resources, loading, addResource, deleteResource } = useContext(ResourcesContext);

  const [formData, setFormData] = useState({ title: "", type: "", url: "", topic: "", notes: "" });
  const [filterTopic, setFilterTopic] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    setErrorMessage("");
    if (!formData.title || !formData.type) {
      setErrorMessage("Title and type are required");
      return;
    }
    setIsSubmitting(true);
    const result = await addResource(formData);
    setIsSubmitting(false);
    if (!result.success) { setErrorMessage(result.message); return; }
    setFormData({ title: "", type: "", url: "", topic: "", notes: "" });
  };

  const filtered = resources.filter((r) => {
    if (filterTopic && r.topic !== filterTopic) return false;
    if (filterType && r.type !== filterType) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-2">Resource Hub</h1>
      <p className="text-gray-400 mb-10">Your notes, videos, articles — all in one place 📚</p>

      {/* Add Form */}
      <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl mb-10">
        <h2 className="text-2xl font-bold mb-6">Add Resource</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            name="title" placeholder="Title (e.g. DP Playlist by Striver)"
            value={formData.title} onChange={handleChange}
            className="bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-400 transition"
          />

          <select name="type" value={formData.type} onChange={handleChange}
            className="bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-400 transition">
            <option value="">Select Type</option>
            <option value="video">▶ Video</option>
            <option value="article">📄 Article</option>
            <option value="pdf">📕 PDF Link</option>
            <option value="note">📝 Note</option>
          </select>

          <select name="topic" value={formData.topic} onChange={handleChange}
            className="bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-400 transition">
            <option value="">Select Topic (optional)</option>
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          <input
            name="url" placeholder="URL (YouTube / Drive / Article link)"
            value={formData.url} onChange={handleChange}
            className="bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-400 transition"
          />
        </div>

        <textarea
          name="notes" placeholder="Notes (optional) — write anything you want to remember"
          value={formData.notes} onChange={handleChange} rows={3}
          className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-400 transition resize-none mb-4"
        />

        {errorMessage && <p className="text-red-400 text-sm mb-4">{errorMessage}</p>}

        <button onClick={handleAdd} disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-[1.02] transition-all duration-300 px-8 py-4 rounded-2xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? "Adding..." : "Add Resource"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)}
          className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-blue-400 transition text-sm">
          <option value="">All Topics</option>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
          className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-blue-400 transition text-sm">
          <option value="">All Types</option>
          <option value="video">Video</option>
          <option value="article">Article</option>
          <option value="pdf">PDF</option>
          <option value="note">Note</option>
        </select>

        {(filterTopic || filterType) && (
          <button onClick={() => { setFilterTopic(""); setFilterType(""); }}
            className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-sm transition">
            Clear Filters ✕
          </button>
        )}
      </div>

      {/* Resource Cards */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg">No resources yet. Add your first one above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((r) => (
            <div key={r.id}
              className="bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-xl hover:border-blue-400/30 transition-all duration-300">

              {/* Top row */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-bold text-white">{r.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${TYPE_COLORS[r.type]}`}>
                  {TYPE_ICONS[r.type]} {r.type}
                </span>
              </div>

              {/* Topic tag */}
              {r.topic && (
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium mb-3">
                  {r.topic}
                </span>
              )}

              {/* Notes */}
              {r.notes && (
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{r.notes}</p>
              )}

              {/* Bottom row */}
              <div className="flex items-center justify-between mt-2">
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium underline underline-offset-2 transition">
                    Open Link →
                  </a>
                ) : <span />}

                <button onClick={() => deleteResource(r.id)}
                  className="px-4 py-2 rounded-xl bg-rose-400/20 text-rose-300 hover:bg-rose-400/40 transition text-sm font-medium">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Resources;