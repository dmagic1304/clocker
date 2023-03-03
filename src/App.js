import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
