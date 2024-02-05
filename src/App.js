
// import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


export default class App extends Component {
  
  render() {
    return (
      
      <div>
        <BrowserRouter>
         <Navbar/>
      
      <Routes>
        <Route exact path="/" element={<News key="general" pageSize={9} country="in" category="general"/>}/>
        <Route exact path="/Business" element={<News key="Business" pageSize={9} country="in" category="Business"/>}/>
        <Route exact path="/Entertainment" element={<News key="Entertainment" pageSize={9} country="in" category="Entertainment"/>}/>
        <Route exact path="/Health" element={<News key="Health" pageSize={9} country="in" category="Health"/>}/>
        <Route exact path="/Science" element={<News key="Science"pageSize={9} country="in" category="Science"/>}/>
        <Route exact path="/Sport" element={<News key="sport" pageSize={9} country="in" category="sport"/>}/>
        <Route exact path="/Technology" element={<News key="Technology" pageSize={9} country="in" category="Technology"/>}/>
      </Routes>
      </BrowserRouter>
      </div>
    )
  }
}