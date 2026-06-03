import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <div className="bg-black text-white min-h-screen">


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
         <Route

  path="/dashboard"

  element={

    <ProtectedRoute>

      <Dashboard />

    </ProtectedRoute>

  }

/>
        <Route

  path="/questions"

  element={

    <ProtectedRoute>

      <Questions />

    </ProtectedRoute>

  }

/>
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;