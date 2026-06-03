
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };


  return (

    <aside className="
      w-[260px]
      min-h-screen
      bg-[#111827]
      border-r
      border-white/10
      flex
      flex-col
      justify-between
      px-6
      py-8
      shadow-2xl
    ">

      {/* Top Section */}

      <div>

        {/* Logo */}

        <h1 className="
          text-3xl
          font-extrabold
          mb-12
          tracking-wide
          bg-gradient-to-r
          from-blue-400
          to-cyan-300
          text-transparent
          bg-clip-text
        ">

          PrepTracker

        </h1>


        {/* Navigation */}

        <nav className="
          flex
          flex-col
          gap-3
        ">

          <Link
            to="/"
            className="
              px-4
              py-3
              rounded-xl
              text-gray-300
              hover:bg-[#1e293b]
              hover:text-white
              transition
              duration-300
              font-medium
            "
          >

            🏠 Home

          </Link>


          <Link
            to="/dashboard"
            className="
              px-4
              py-3
              rounded-xl
              text-gray-300
              hover:bg-[#1e293b]
              hover:text-white
              transition
              duration-300
              font-medium
            "
          >

            📊 Dashboard

          </Link>


          <Link
            to="/questions"
            className="
              px-4
              py-3
              rounded-xl
              text-gray-300
              hover:bg-[#1e293b]
              hover:text-white
              transition
              duration-300
              font-medium
            "
          >

            📚 Questions

          </Link>

        </nav>

      </div>


      {/* Bottom Section */}

      <button

        onClick={handleLogout}

        className="
          w-full
          py-3
          rounded-xl
          bg-gradient-to-r
          bg-rose-400/90
        hover:bg-rose-400
          hover:scale-[1.02]
          transition
          duration-300
          font-semibold
          shadow-lg
        "
      >

        Logout

      </button>

    </aside>

  );
}

export default Sidebar;

