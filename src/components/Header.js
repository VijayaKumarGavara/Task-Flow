import { useState } from "react";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="header">
        <div className="logo-container">
          <div className="logo-image-container">
            <img
              src="https://res.cloudinary.com/dicmdo152/image/upload/v1761481206/task-flow_pabdgn.jpg"
              alt="Logo"
              height="150"
            ></img>
          </div>
          <div className="logo-title-container">Task Flow</div>
        </div>
        <div className="menu-btn">
          <button
            type="button"
            onClick={() => setIsMenuOpen(isMenuOpen === false ? true : false)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className={`nav-panel ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>Home</li>
            <li>Planning</li>
            <li>Tasks</li>
            <li>History</li>
          </ul>
        </nav>
      )}
    </>
  );
}
