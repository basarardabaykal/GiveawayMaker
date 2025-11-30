import './App.css';
import { Giveaway } from './pages/Giveaway';
import { Participate } from './pages/Participate';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Giveaway />} />
          <Route path="/participate" element={<Participate />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
