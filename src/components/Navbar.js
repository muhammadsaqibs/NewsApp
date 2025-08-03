import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ mode, toggleMode }) {
  const navStyle = {
    backgroundColor: mode === 'dark' ? '#343a40' : '#e3f2fd',
    color: mode === 'dark' ? 'white' : '#000',
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={navStyle}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: navStyle.color }}>
          Noval News
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              { name: "General", path: "/" },
              { name: "Business", path: "/business" },
              { name: "Sports", path: "/sports" },
              { name: "Technology", path: "/technology" },
              { name: "Entertainment", path: "/entertainment" },
            ].map((item) => (
              <li className="nav-item" key={item.name}>
                <Link className="nav-link" to={item.path} style={{ color: navStyle.color }}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onChange={toggleMode}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ color: navStyle.color }}>
              {mode === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}
