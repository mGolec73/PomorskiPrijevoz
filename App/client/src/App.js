import React  from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginButton from "./pages/LoginButton";
import LogoutButton from "./pages/LogoutButton";
import ProfileButton from "./pages/ProfileButton";
import RefreshButton from "./pages/RefreshButton";
import { useAuth0 } from "@auth0/auth0-react";

import Home from "./pages/Home";
import Datatable from "./pages/Datatable";
import Profile from "./pages/Profile";





const App= ()=> {
  const { isLoading, error } = useAuth0();
      return (
        <div className="App">
          <Routes>
              <Route exact path="/"
                element= { <>
                  {error && <p>Authentication Error</p>}
                  {!error && isLoading && <p>Loading...</p>}
                  {!error && !isLoading && (
                   
                     <><LoginButton /><LogoutButton /> <ProfileButton /> <RefreshButton /> <Home /></>
                    
          )}
                 
                 </> }
                 /> 
              <Route exact path="/datatable"
                element={
                  <Datatable/>
                }
              />
              <Route exact path="/profile"
                element={
                  <Profile/>
                }
              />
          </Routes>
        </div>
        
      );

  }

export default App;
