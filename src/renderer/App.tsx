import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import Hello from './components/Hello';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
