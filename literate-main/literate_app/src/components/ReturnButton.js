import React from "react";
import "../css/ReturnButton.css";
import { useNavigate } from "react-router-dom";

function ReturnButton() {
  const navigate = useNavigate();

  return (
    <button
      className="return-button"
      onClick={() => navigate(-1)}
      title="Vis forrige side"
    >
      <svg
        id="figur"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#FFFFFF"
          d="M8.2 12l7.4 7.4c.4.4 1 .4 1.4 0s.4-1 0-1.4l-6-6 6-6c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-7.4 7.4c-.4.4-.4 1 0 1.4z"
        />
      </svg>
    </button>
  );
}

export default ReturnButton;
