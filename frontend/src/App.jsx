import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import ReminderAction from "./pages/ReminderAction";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reminder/:id" element={<ReminderAction />} />

      {/* New Route */}
      <Route path="/history" element={<History />} />
    </Routes>
  );
};

export default App;