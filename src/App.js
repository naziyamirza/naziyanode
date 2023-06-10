
import './App.css';
import React, { Component } from 'react'

import { link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { Routes } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
      <h1>This is iNotebook App</h1>
      <NoteState>

      <Router>
        <Navbar/>
        <Alert message="This is amazing react course"/>
      
      <Routes>
        
        <Route exact path="/"  element={<Home />}></Route>
        <Route exact path="about"  element={<About />}></Route>
        
        
        </Routes>
    
      </Router>
      </NoteState>
      
    </>
  );
}

export default App;
