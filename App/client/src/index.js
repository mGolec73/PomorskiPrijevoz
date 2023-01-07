import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Auth0Provider
    domain="dev-6kunn23uhhy6gypv.us.auth0.com"
    clientId="x3B2xyV7Ccb63jKsweQ1ZqSvaCseGDNk"
    redirectUri={window.location.origin}>
      <App/>
    </Auth0Provider>
  </Router>
  
);
