import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VetAppointment from "./VetAppointment";
import './VetProfiles.css';

const VetProfiles = () => {
  const { vetID } = useParams();
  const [vetProfiles, setVetProfiles] = useState([]);

  useEffect(() => {
    fetchVetProfiles();
  }, []);

  const fetchVetProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/vet/vetProfiles');
      setVetProfiles(response.data);
    } catch (error) {
      console.error('Error fetching vet profiles:', error);
    }
  };

  if (!vetProfiles.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="vet-profile-container">
      <div className="vet-hero-section">
        <div className="vet-welcome-message">
          <h1>Welcome to Our Veterinarians!</h1>
          <p>
            Explore our experienced veterinarians, each with their own unique specialties to care for your pets.
          </p>
        </div>
      </div>

      <div className="vet-card-container">
        {vetProfiles.map((vet) => (
          <div key={vet.vetID} className="vet-card">
            <div className="vet-details">
              <h2>{vet.vetName}</h2>
              <p><strong>Vet ID:</strong> {vet.vetID}</p>
              <p><strong>Email:</strong> {vet.vetEmail}</p>
              <p><strong>Specialization:</strong> {vet.vetSpecialization}</p>
              <p><strong>Phone:</strong> {vet.vetPhone}</p>
              <p><strong>Clinic:</strong> {vet.clinic}</p>
              <VetAppointment vetId={vet.vetID} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VetProfiles;











