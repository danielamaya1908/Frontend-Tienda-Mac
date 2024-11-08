import React from 'react';
import './SubNavbar.css';

const SubNavbar = () => {
  return (
    <nav className="sub-navbar">
      <div className="container-fluid">
        <ul className="sub-navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="LoNuevo">Lo Nuevo</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="macAll">Mac</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Jbl">JBL</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="bose">Bose</a>
          </li>
           <li className="nav-item">
            <a className="nav-link" href="zagg">Zagg</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SubNavbar;
