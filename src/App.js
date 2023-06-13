import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import Profile from "./pages/Profile";
import Teacher from './pages/Teacher';
import Teachers from './pages/Teachers';
import Login from "./pages/Login"
import Register from './pages/Register';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state) => state.currentUser);

  const RedirectToWelcome = () => <Navigate to="/" />;

  return (
    <Router>
      <div>
        <Routes>
          {user && <Route path="/register" element={<RedirectToWelcome />} />}
          {user && <Route path="/login" element={<RedirectToWelcome />} />}
          {!user && <Route path="/register" element={<Register />} />}
          {!user && <Route path="/login" element={<Login />} />}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/teacher/:id" element={<Teacher />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
