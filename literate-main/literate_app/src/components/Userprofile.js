import React from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase_setup/firebase";
import { signOut} from "firebase/auth";
import { PopupMenu } from "react-simple-widgets";
import { ToastMessage, showToast } from './ToastMessage';
import "../css/Userprofile.css";

function Userprofile() {
    const navigate = useNavigate();

    const user = auth.currentUser;

    // Function to get username (email) from user
    function getUsername(user) {
      return <>{user ? user.email : "Anonym"}</>;
  }

    // Function for log out
    function logout() {
      signOut(auth).then(() => {
        showToast(
        "Du er nå logget ut!", 
        "default", 
        1000, 
        () => {
          navigate("/");
        }
        );
      }).catch((error) => {
        console.error(error);
      });
  }

    return (     
      <>
      <ToastMessage />
      <PopupMenu className="Userprofile">
          <button id="Min profil"> Min profil </button>

          <div className="userframe">
            <div>
              
              <div className="bruker"> 
                <div>{getUsername(user)}</div></div>
                <div>
                <button id="MineLister" onClick={() => navigate("/Favoritter")}> Mine Favoritter </button>
                </div>
              <div>
              <button id="LogOut" onClick={logout}> Logg ut </button>
              </div>
            </div>
          </div>
        </PopupMenu>  
      </>  
      );
}

export default Userprofile;