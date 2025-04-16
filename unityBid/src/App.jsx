import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import NavFromWelcome from './components/NavFromWelcome';
import UserProfile from "./pages/UserProfile"
import Community from './pages/Community';
import BiddingPage from './pages/BiddingPage';
import Features from './components/Features';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<NavFromWelcome />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path='/UserProfile' element={<UserProfile />} />
          <Route path='/Community' element={<Community />} />
          <Route path='/BiddingPage' element={<BiddingPage />} />
          <Route path='/Features' element={<Features />} />
          <Route path='/ImageUpload' element={<ImageUpload />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
