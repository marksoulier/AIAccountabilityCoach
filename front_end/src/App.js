import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Subscribe from './components/Subscribe/Subscribe';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to /index */}
        <Route path="/index/dashboard" element={<Dashboard />} />
        <Route path="/index/profile" element={<Profile />} />
        <Route path="/index/subscribe" element={<Subscribe />} />
        <Route path="/" element={<Navigate replace to="/index/dashboard" />} />
        <Route path="/index" element={<Navigate replace to="/index/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
