import React from 'react';
import HealthCardDashBoard from './HealthCardDashBoard';


function HealthCardMainDashBoard(){
  const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundColor: 'white',
    height: '100vh',
   
  };
  
  return (
   
    <div className="home-container" style={backgroundStyle}>
      
    
      <HealthCardDashBoard />
      {/* <HeroSection/> */}
      {/* <CardsContainer/> */}
      
      {/* </div> */}
      
    </div>
    
  );
}

export default HealthCardMainDashBoard;
