import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tournament from "./pages/Tournaments";
import TournamentDetails from "./pages/TournamentDetails";
import Leaderboard from "./pages/Leaderboard";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/About" element={<About />}/>
        <Route path="/Tournaments" element={<Tournament />}/>
        <Route path="/Tournaments/:id" element={<TournamentDetails />}/>
        <Route path="/Leaderboard" element={<Leaderboard />}/>
        <Route path="/Contact" element={<Contact />}/>
      </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;