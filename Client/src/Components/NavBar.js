import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import "./NavBar.css";

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><HashLink to="/#about">About</HashLink></li>
        <li><Link to="/adopt">Adopt</Link></li>
        <li><HashLink to="/#service">Services</HashLink></li>
        <li><HashLink to="/#contact">Contact</HashLink></li>
        <li><Link to="/signup">Login</Link></li>
        {/* <li><Link to="/admin">Admin</Link></li> */}
      </ul>
    </nav>
  );
}

export default NavigationBar;
