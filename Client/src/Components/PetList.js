import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PetList = ({ searchCriteria = {} }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    if (Object.keys(searchCriteria).length) {
      searchPets();
    } else {
      fetchPets();
    }
  }, [searchCriteria]);

  const fetchPets = async () => {
    try {
      const response = await axios.get('/api/pet/allpets');
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const searchPets = async () => {
    try {
      const response = await axios.get('/api/pet', { params: searchCriteria });
      setPets(response.data);
    } catch (error) {
      console.error('Error searching pets:', error);
    }
  };

  return (
    <div>
      {pets.map(pet => (
        <div key={pet.id}>
          <img src={`/uploads/${pet.petImage}`} alt={pet.petName} />
          <h2>{pet.petName}</h2>
          <p>{pet.petBreed}</p>
          <Link to={`/pet/${pet.id}`}>View Profile</Link>
        </div>
      ))}
    </div>
  );
};

export default PetList;
