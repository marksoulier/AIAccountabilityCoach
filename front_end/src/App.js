import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Subscribe from './components/Subscribe/Subscribe';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthTokens } from './actions/authActions';
import { fetchGoals } from './actions/goalActions';
import store from './store';

function App() {
  // Set Authentication tokens from cookies
  const dispatch = useDispatch();

  useEffect(() => {
    // Assuming tokens are stored in cookies for this example
    const accessToken = Cookies.get('jwt_access_token');
    const refreshToken = Cookies.get('jwt_refresh_token');

    // console.log('Access Token React:', accessToken);
    // console.log('Refresh Token React:', refreshToken);
    if (accessToken && refreshToken) {
      dispatch(setAuthTokens(accessToken, refreshToken));

      //fetch the user data
      dispatch(fetchGoals());
    }
  }, [dispatch]);

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
