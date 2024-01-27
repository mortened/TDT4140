import React from "react";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
import ReturnButton from "./ReturnButton";
import DarkMode from "./DarkMode";
import logo from "../resources/logo.png";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="Overskrift">
      <ReturnButton />
      <h1
        className="overskriftTekst"
        onClick={() => navigate("/")}
        title="Tilbake til hjemmesiden"
      >
        {" "}
        LiteRate{" "}
      </h1>
      <img
        className="headerBilde"
        src={logo}
        alt="My Image"
        onClick={() => navigate("/")}
      ></img>
      <DarkMode />
    </div>
  );
}

export default Header;
