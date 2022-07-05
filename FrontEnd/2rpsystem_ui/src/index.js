import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';

import './index.css';

import Login from './pages/login'
import ListaUsuarios from './pages/listaUsuarios';
import PerfilUsuario from './pages/perfil'
import CadastroUsuario from './pages/cadastroUsuario';
import NotFound from './pages/notFound'

const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/listaUsuarios" element={<ListaUsuarios />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
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