import React from 'react';

const SubNavbar = () => {
  return (
    <nav className="sub-navbar navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <ul className="navbar-nav mx-auto">
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
        </ul>
      </div>
    </nav>
  );
};

export default SubNavbar;
