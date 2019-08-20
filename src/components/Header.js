import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <header>
    <div className="branding">
      <h1>:OR</h1>
    </div>
    <nav className="topnav">
      <ul>
        <li>
          <a href="/#">HOME</a>
        </li>
        <li>
          <a href="/#">ROOMS</a>
        </li>
        <li>
          <a href="/#">FACILITIES</a>
        </li>
        <li>
          <a href="/#">NEWS</a>
        </li>
        <li>
          <a href="/#">ABOUT US</a>
        </li>
        <li>
          <div className="search">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </div>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
