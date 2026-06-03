import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 flex gap-6">

      <Link to="/" className="text-white hover:text-blue-400">
        Home
      </Link>

      <Link to="/register" className="text-white hover:text-blue-400">
        Register
      </Link>
       <Link to="/login" className="text-white hover:text-blue-400">
        Login
      </Link>

      <Link to="/dashboard" className="text-white hover:text-blue-400">
        Dashboard
      </Link>

      <Link to="/questions" className="text-white hover:text-blue-400">
        Questions
      </Link>

    </nav>
  );
}

export default Navbar;