import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import { Home, Commands } from './pages';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/commands' element={<Commands/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);