import React from "react";
import "../css/Footer.css";
import bokforlag from "../resources/bokforlag.png";

function Footer() {

  return (
    <div className="footer">
      <div className="reklame">
      <img src={bokforlag} alt="wow" />
      </div>
    </div>
  );
}

export default Footer;
