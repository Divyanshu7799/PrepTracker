import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHome, FaChartLine, FaCode, FaBookOpen } from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { to: "/",          icon: <FaHome />,      label: "Home" },
    { to: "/dashboard", icon: <FaChartLine />, label: "Dashboard" },
    { to: "/questions", icon: <FaCode />,      label: "Questions" },
    { to: "/resources", icon: <FaBookOpen />,  label: "Resources" },
  ];

  return (
    <aside className="w-[240px] min-h-screen bg-[#0d1117] border-r border-white/5 flex flex-col justify-between px-5 py-8 shadow-2xl">
      <div>
        <h1 className="text-2xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
          PrepTracker
        </h1>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                  ${isActive
                    ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <span className={isActive ? "text-blue-400" : "text-gray-500"}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/20 hover:bg-rose-500/25 transition-all duration-200 font-medium text-sm"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
