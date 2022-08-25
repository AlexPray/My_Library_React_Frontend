import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <div>
      <nav className="nav-bar">
        <ul className="nav-list">
          <li>
            <Link to="/search" className="nav-listpoint">
              Search
            </Link>
          </li>
          <li>
            <Link to="/mylibrary" className="nav-listpoint">
              My Library
            </Link>
          </li>
          <li>
            <Link to="/documentation" className="nav-listpoint">
              Documentation
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
