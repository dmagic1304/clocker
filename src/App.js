import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import SignIn from './components/SignIn';
import MainControl from './components/MainControl';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<MainControl />}></Route>
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
