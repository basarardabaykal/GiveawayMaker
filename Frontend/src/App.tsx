import './App.css';
import { Giveaway } from './pages/Giveaway';
import { Participate } from './pages/Participate';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Giveaway />} />
      <Route path="/participate" element={<Participate />} />
    </Routes>
  );
}

export default App
