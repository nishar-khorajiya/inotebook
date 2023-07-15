import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import Notes from './components/Notes';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

const App =()=> {

    return (
      <>
      <NoteState>
        
        <Router>
          <Navbar />
          {/* <Alert message="it's Nishar"/> */}
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/about" element={<About/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
          
          </Routes>
          {/* <Notes/> */}
          </div>
        </Router>

      </NoteState>
      </>
    )
  
}

export default App


