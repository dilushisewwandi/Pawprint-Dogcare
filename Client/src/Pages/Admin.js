import React from 'react';
import MainDashboard from '../Components/MainDashboard';


function Admin(){
  const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundColor: 'white', 
    height: '100vh',
    };
  
  return (
    
    <div className="home-container" style={backgroundStyle}>
      
      <MainDashboard/>
      {/* <HeroSection/> */}
      {/* <CardsContainer/> */}
      
      {/* </div> */}
      
    </div>
    
  );
}

export default Admin;
