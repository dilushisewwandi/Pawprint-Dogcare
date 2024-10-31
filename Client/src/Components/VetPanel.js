import React from "react";
import { useNavigate } from "react-router-dom";
import "./VetPanel.css"; 

const VetPanel = () => {
  const navigate = useNavigate();

  // Handle button clicks to navigate to the appropriate pages
  const handleCreateProfileClick = () => {
    navigate("/vet/:userID");
  };

  const handleManageAppointmentsClick = () => {
    navigate("/findVetAppointment");
  };

  const handleCheckHealthReportsClick = () => {
    navigate("/healthCardMainDashBoard");
  };

  return (
    <div className="vetPanel-section">
      <h1>Welcome to the Vet Management Panel</h1>
      <p>Manage your vet tasks and monitor appointments with ease.</p>
      <div className="vetPanel-content">
        <div className="vetPanel-card-group">
          <div className="vetPanel-card">
            <img src="./Assets/vet1.jpg" className="vetPanel-card-img" alt="Create Profile" />
          </div>
          <button onClick={handleCreateProfileClick} className="vetPanel-btn">
            Create Vet Profile
          </button>
        </div>

        <div className="vetPanel-card-group">
          <div className="vetPanel-card">
            <img src="./Assets/vet2.jpg" className="vetPanel-card-img" alt="Manage Appointments" />
          </div>
          <button onClick={handleManageAppointmentsClick} className="vetPanel-btn">
            View Appointments
          </button>
        </div>

        <div className="vetPanel-card-group">
          <div className="vetPanel-card">
            <img src="./Assets/vet3.jpg" className="vetPanel-card-img" alt="Check Health Reports" />
          </div>
          <button onClick={handleCheckHealthReportsClick} className="vetPanel-btn">
            Health Card Management
          </button>
        </div>
      </div>
    </div>
  );
};

export default VetPanel;
