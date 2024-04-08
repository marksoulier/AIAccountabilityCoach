import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Subscribe from './components/Subscribe/Subscribe';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthTokens } from './actions/authActions';
import { fetchGoals } from './actions/goalActions';
import FormPage from './components/GoalCreator/FormPage';
import ResultsPage from './components/GoalCreator/ResultsPage';
import PaymentComponent from './components/Payment/PaymentComponent';
import Front from './components/Front/Front';

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

      //remove the tokens from the cookies
      Cookies.remove('jwt_access_token');
      Cookies.remove('jwt_refresh_token');
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Redirect from root to /index */}
        {/* <Route path="/index/dashboard" element={<Dashboard />} /> */}
        <Route path="/index/dashboard" element={<Front />} />
        <Route path="/index/profile" element={<Profile />} />
        <Route path="/index/subscribe" element={<Subscribe />} />
        <Route path="/" element={<Navigate replace to="/index/dashboard" />} />
        <Route path="/index" element={<Navigate replace to="/index/dashboard" />} />
        <Route path="/index/form" element={<FormPage />} />
        <Route path="/index/results" element={<ResultsPage />} />
        <Route path="/index/payment" element={<PaymentComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
