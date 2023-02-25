import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClockIn from './components/ClockIn';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <ClockIn />
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />}></Route>
          </Route>

          <Route path="/SignIn">
            <Route index element={<SignIn />}></Route>
            <Route path="SignIn" element={<SignIn />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
