import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import About from './pages/About';
import Leaderboard from './pages/Leaderboard';
import Tournaments from './pages/Tournaments';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/Signup';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/Home" element={<Home />}/>
      <Route path="/About" element={<About />}/>
      <Route path="/Tournaments" element={<Tournaments />}/>
      <Route path="/Leaderboard" element={<Leaderboard />}/>
      <Route path="/Contact" element={<Contact />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/Signup" element={<SignUp />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;