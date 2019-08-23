import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer>
    <div className="branding">
      <h1>:OR</h1>
    </div>
    <div className="info">
      <ul>
        <li>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
50 Nathan Road,Tsimshatsui, Kowloon Hong Kong
        </li>
        <li>
          <FontAwesomeIcon icon={faPhone} />
+886 932 379 080
        </li>
        <li>
          <FontAwesomeIcon icon={faEnvelope} />
or_hotel@gmail.com
        </li>
      </ul>
    </div>
    <div className="links">
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
      </ul>
    </div>
    <div className="socital-media-icons">
      <ul>
        <li><FontAwesomeIcon icon={faFacebookF} size="2x" /></li>
        <li><FontAwesomeIcon icon={faTwitter} size="2x" /></li>
        <li><FontAwesomeIcon icon={faInstagram} size="2x" /></li>
      </ul>
    </div>
    <p>Copyright © 2019 :OR All Rights Reserved.</p>
  </footer>
);

export default Footer;
