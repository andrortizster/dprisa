import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';



import NavBar from './components/NavBar/NavBar';
import Router from './components/Router/Router';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>  
      <Router />
    </BrowserRouter>
  );
}

export default App;
