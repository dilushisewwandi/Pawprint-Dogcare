import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Adoption.css'; 

const Adoption = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/pet/allpets');
      console.log('Fetched pets:', response.data);
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleMoreDetails = (petID) => {
    navigate(`/petProfile/${petID}`);
  };

  return (
    <div className="adoption-container">
      <div className="adoption-hero-section">
        <div className="adoption-welcome-message">
          <h1>Every Pet Deserves a Loving Home</h1>
          <p>Will you be their hero?</p>
          <p>Check below to find your favourite companion</p>
        </div>
      </div>

      {pets.length === 0 ? (
        <p>No pets available for adoption at the moment.</p>
      ) : (
        <div className="adoption-pet-cards">
          {pets.map((pet) => (
            <div key={pet.petID} className="adoption-pet-card">
              <img
                src={`http://localhost:8800/uploads/${pet.petImage}`}
                alt={pet.petName}
                className="adoption-pet-image"
              />
              <div className="adoption-pet-details">
                <h2>{pet.petName}</h2>
                <p><strong>Breed:</strong> {pet.petBreed}</p>
                <p><strong>Age:</strong> {pet.petAge} months</p>
                <p><strong>Gender:</strong> {pet.petGender}</p>
                <p><strong>Skin Color:</strong> {pet.petSkinColor}</p>
                <p><strong>Height:</strong> {pet.petHeight} cm</p>
                <p><strong>Weight:</strong> {pet.petWeight} kg</p>
                <h3>{pet.status}</h3>
                <button onClick={() => handleMoreDetails(pet.petID)}>More details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Adoption;
