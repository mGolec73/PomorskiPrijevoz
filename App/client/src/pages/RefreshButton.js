import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { refresh } from "../utils/fetchFunctions";
const RefreshButton = () => {
   const {isAuthenticated } = useAuth0();
   return (
     isAuthenticated && (
       <button onClick = {()=> refresh()}>
         Refresh
       </button>
     )
   )
 }
 
 export default RefreshButton;