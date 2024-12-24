import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import Header from './components/Header';

const RoutesConfig = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  </Router>
);

export default RoutesConfig;