import React from "react";
import { useNavigate } from "react-router-dom";
import "./DaycarePanel.css";

const DaycarePanel = () => {
  const navigate = useNavigate();

  const handleCreateDaycareProfileClick = () => {
    navigate("/daycareRegiForm");
  };

  const handleManageBookingsClick = () => {
    navigate("/findDaycareBooking");
  };

  const handleViewScheduleClick = () => {
    navigate("/viewDaycareSchedule");
  };

  return (
    <div className="daycarePanel-section">
      <h1>Welcome to the Daycare Management Panel</h1>
      <p>Manage your daycare tasks, monitor bookings, and view schedules with ease.</p>
      <div className="daycarePanel-content">
        <div className="daycarePanel-card-group">
          <div className="daycarePanel-card">
            <img src="./Assets/pet groom.jpg" className="daycarePanel-card-img" alt="Create Profile" />
          </div>
          <button onClick={handleCreateDaycareProfileClick} className="daycarePanel-btn">Create Daycare Profile</button>
        </div>

        <div className="daycarePanel-card-group">
          <div className="daycarePanel-card">
            <img src="./Assets/distribute.jpg" className="daycarePanel-card-img" alt="Manage Bookings" />
          </div>
          <button onClick={handleManageBookingsClick} className="daycarePanel-btn">View Bookings</button>
        </div>

        <div className="daycarePanel-card-group">
          <div className="daycarePanel-card">
            <img src="./Assets/signup3.jpg" className="daycarePanel-card-img" alt="View Schedule" />
          </div>
          <button onClick={handleViewScheduleClick} className="daycarePanel-btn">View Schedule</button>
        </div>
      </div>
    </div>
  );
};

export default DaycarePanel;
