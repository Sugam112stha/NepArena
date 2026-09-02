import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Tournament from "./pages/Tournaments";
import Leaderboard from "./pages/Leaderboard";
import MainLayout from "./pages/MainLayout";
import CreateTeamModal from "./components/teams/CreateTeamModels";
import { AuthProvider } from "./auth/authContext";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Tournaments" element={<Tournament />} />
            <Route path="/Leaderboard" element={<Leaderboard />} />
            <Route path="/Contact" element={<Contact />} />

            {/* Protected Routes (Requires Login) */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/createteam"
                element={
                  <CreateTeamModal
                    isOpen={true}
                    onClose={() => window.history.back()}
                  />
                }
              />
            </Route>
          </Route>

          {/* Standalone Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;