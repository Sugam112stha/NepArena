import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AuthCallback from "./auth/AuthCallback";
import Tournament from "./pages/Tournaments";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import Matches from "./pages/Matches";
import MyTeam from "./pages/MyTeam";
import MainLayout from "./pages/MainLayout";
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
              <Route path="/createteam" element={<Navigate to="/my-team" replace />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/my-team" element={<MyTeam />} />
          </Route>

          {/* Standalone Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;