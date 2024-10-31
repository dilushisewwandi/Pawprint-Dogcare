import React, { useState } from 'react';
import PetList from './PetList';

const SearchBar = () => {
  const [color, setColor] = useState('');
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({});

  const handleSearch = () => {
    setSearchCriteria({ color, gender, breed, age });
  };

  return (
    <div>
      <input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} />
      <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
      <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <PetList searchCriteria={searchCriteria} />
    </div>
  );
};

export default SearchBar;
