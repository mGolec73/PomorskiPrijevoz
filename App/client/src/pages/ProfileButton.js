import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileButton = () => {
  const {isAuthenticated } = useAuth0();
  const history = useNavigate();
const ProfilePage = () => {
   history("/profile");
}
  return (
    isAuthenticated && (
      <button onClick = {ProfilePage}>
        Profile
      </button>
    )
  )
}

export default ProfileButton;