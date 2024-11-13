import React from "react";
import { useNavigate } from "react-router-dom";
import "./DistributorPanel.css"; 

const DistributorPanel = () => {
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate("/distributor/:userId");
  };

  const handleRegisterPetClick = () => {
    navigate("/pet/register");
  };

  const handleCheckRequestsClick = () => {
    navigate("/findAdoptionRequests");
  };

  return (
    <div className="distributorPanel-section">
      <h1>Welcome to the Distributor Management Panel</h1>
      <p>Manage your distribution tasks and monitor adoption requests with ease.</p>
      <div className="distributorPanel-content">
        <div className="distributorPanel-card-group">
          <div className="distributorPanel-card">
            <img src="./Assets/find.jpg" className="distributorPanel-card-img" />
          </div>
          <button onClick={handleCreateAccountClick} className="distributorPanel-btn">Create Account</button>
        </div>

        <div className="distributorPanel-card-group">
          <div className="distributorPanel-card">
            <img src="./Assets/signup4.jpg" className="distributorPanel-card-img" />
          </div>
          <button onClick={handleRegisterPetClick} className="distributorPanel-btn">Register a Pet</button>
        </div>

        <div className="distributorPanel-card-group">
          <div className="distributorPanel-card">
            <img src="./Assets/signup back2.jpg" className="distributorPanel-card-img" />
          </div>
          <button onClick={handleCheckRequestsClick} className="distributorPanel-btn">Check Adoption Requests</button>
        </div>
      </div>
    </div>
  );
};

export default DistributorPanel;
