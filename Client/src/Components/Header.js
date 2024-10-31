import React from 'react'
import './Header.css';
import NavigationBar from './NavBar';
import Logo from './Logo';

function Header() {
  return (
    <header className="header">
      <Logo/> 
       <NavigationBar/> 
       
    </header>

    
  );
}

export default Header;

