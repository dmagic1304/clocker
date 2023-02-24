import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainControl from './components/MainControl';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
        <MainControl />
        <Footer />
      </header>
    </div>
  );
}

export default App;
