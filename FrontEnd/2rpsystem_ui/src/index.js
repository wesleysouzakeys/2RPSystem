import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';

import './index.css';

import NotFound from './pages/notFound'
import Login from './pages/login'

const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path='/notFound' element={<NotFound />} />
        <Route path="*" element={<Navigate to="notFound" />} />
      </Routes>
    </div>
  </Router>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  routing
);