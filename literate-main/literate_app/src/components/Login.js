import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase_setup/firebase";
import { ToastMessage, showToast } from './ToastMessage';
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import "../css/Login.css";

// A function that validates the password and confirm password inputs
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const path = "/";
  const navigate = useNavigate();

  // Function for log in
  const onLogin = (e) => {
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        
        showToast(
          `Hurra! Du er logget inn med brukeren: ${email}`,
          "success",
          1500,
          () => {
            navigate(path);
          }
        );  
      })
      .catch((error) => {
        console.log(error);
        showToast(
          "Logg inn mislykket. Brukernavn eller passord er feil",
          "error",
          3000,
        );
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
            <h2> Logg inn </h2>
            <form className="login-form" onSubmit={onLogin}>
              <label> E-postadresse </label>
              <input
                input="email-address"
                name="email"
                type="email"
                required
                placeholder="Email addresse"
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

              <button type="submit"> Logg inn </button>
  
              <p className="link-btn">
                Trenger du en ny bruker?{" "}
                <Link to="/Register"> Registrer deg </Link>
              </p>
            </form>
          </div>
        </div>
        
      </main>
      <Footer />
    </>
  );
}

export default Login;
