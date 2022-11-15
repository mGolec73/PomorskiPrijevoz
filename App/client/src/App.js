import React, {Component} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";


import Home from "./pages/Home";
import Datatable from "./pages/Datatable";



const App= ()=> {
  
  
   /*  componentDidMount() {
      this.getFakulteti()
        .then(res => this.setState({ data: JSON.stringify(res) }))
        .catch(err => console.log(err));
    }
      // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
     //const response = await fetch('/express_backend');
     const response = await fetch('/express_backend');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    }; */
    
  
      return (
        <div className="App">
          <Routes>
              <Route exact path="/"
                element={
                  <Home/>
                }
              />
              <Route exact path="/datatable"
                element={
                  <Datatable/>
                }
              />
          </Routes>
        </div>
      );

  }

export default App;
