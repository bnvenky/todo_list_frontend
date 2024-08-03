/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import ProtectedRoute from './component/ProtectedRoute'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/home" 
          element={<ProtectedRoute element={<Home />} />} 
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
