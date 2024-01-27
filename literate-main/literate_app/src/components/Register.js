import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase_setup/firebase";
import { signOut} from "firebase/auth";
import {firestore} from "../firebase_setup/firebase";
import {collection, doc, setDoc} from "firebase/firestore";
import { ToastMessage, showToast } from './ToastMessage';
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import "../css/Register.css";

function Register() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const userCollectionRef = collection(firestore, "users");

  const onSignup = async (e) => {
    e.preventDefault();
  
    if (password !== confirmedPassword) {
      showToast(
        `Passordene er ikke like. Skriv passordet på nytt`, 
        "warning",
        2000,
        0
      );


      return false; 
    }

    if (password.length < 6) {
      showToast(
        `Passordet må bestå av minst 6 tegn.`, 
        "warning",
        2000,
        0
      );

      return false; 
    }
    
    function finishRegistration() {
      signOut(auth).then(() => {
        navigate("/Login");
      }).catch((error) => {
        console.error(error);
      });
  }

    // Creating a new user in Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        const user = auth.currentUser;
        const docRef = doc(userCollectionRef, user.uid); 

        setDoc(docRef, {
          username: email,
          favourites: [],
          admin: false,
        });
        
        auth.currentUser = null;

        showToast(
          `Hurra! Brukeren: ${email} har nå blitt registrert!`,
          "success",
          2000,
        );
  
        finishRegistration();
        return true; 
      })

      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          showToast(
            `Brukeren med brukernavn: ${email} er allerede registret!`, 
            "warning",
            2000,
          );
        } else {
          showToast(
            `Registrering av ny bruker mislykkes: ${error.message}`, 
            "error",
            2000,
          );
        }

        return false;
      });
  };

  return (
    <>
      <Header />
      <Navbar />
      <ToastMessage />
      <main>
        <div className="Login">
          <div className="auth-form-container">
            <h2> Registrering </h2>
            <p> Lag en ny bruker </p>

            <form className="login-form" onSubmit={onSignup}>
              <label> E-postadresse </label>
              <input
                input="email-address"
                name="email"
                type="email"
                /*value={user.username}*/
                required
                placeholder="Email adresse"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label> Passord </label>
              <input
                input="password"
                name="password"
                type="password"
                required
                placeholder="Passord"
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                input="confirmed-password"
                name="confirmed-password"
                type="password"
                required
                placeholder="Gjenta passord"
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
        
              <button type="submit"> Registrer deg </button>

              <p className="link-btn">
                Har du allerede en bruker? <Link to="/Login"> Logg inn </Link>
              </p>
            </form>
          </div>
        </div>
        
      </main>
      <Footer />
    </>
  );
};

export default Register;
