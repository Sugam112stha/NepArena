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
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/tournaments" element={<Tournaments />}/>
      <Route path="/leaderboard" element={<Leaderboard />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>
    </Routes>

    </BrowserRouter>
  )
}

export default App;