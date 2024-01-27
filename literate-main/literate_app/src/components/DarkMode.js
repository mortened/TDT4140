import React, { useState } from "react";
import "../css/DarkMode.css";

function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(init());
  function init() {
    if (JSON.parse(window.localStorage.getItem("darkMode"))) {
      document.body.classList.add("dark-mode");
      return true;
    } else {
      return false;
    }
  }
  const handleClick = () => {
    window.localStorage.setItem("darkMode", !isDarkMode);
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <button
      className="dark-button"
      onClick={handleClick}
      title="Bytt farge på siden"
    >
      <svg
        id="half-moon-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#FFFFFF"
          d="M12,2C7,2,3,6.1,3,11s4,9,9,9s9-4.1,9-9s-4-9-9-9zm0,16c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7s-3.1,7-7,7z"
        />
        <path
          fill="#FFFFFF"
          d="M12,3.5C16.1,3.5 19.5,6.9 19.5,11C19.5,15.1 16.1,18.5 12,18.5A9,9 0 0 1 12,3.5Z"
        />
      </svg>
    </button>
  );
}

export default DarkMode;
