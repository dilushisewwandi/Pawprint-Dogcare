import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PetManage.css';

const PetManagement = ({ formType }) => {
    const navigate = useNavigate();
    const [petFormData, setPetFormData] = useState({
        petID: '',
        userID: '',
        adoID:'',
        disID:'',
        dcID:'',
        petName: '',
        petAge: '',
        petHeight: '',
        petWeight: '',
        petGender: '',
        petSkinColor: '',
        petBreed: ''
    });
    const [petImage, setPetImage] = useState(null);
    const [petToDelete, setPetToDelete] = useState('');
    const [petSearchCriteria, setPetSearchCriteria] = useState({
        searchBy: '',
        searchValue: ''
    });
    const [foundPets, setFoundPets] = useState([]);

    const handlePetChange = (e) => {
        const { name, value } = e.target;
        setPetFormData({ ...petFormData, [name]: value });
    };

    const handlePetImageChange = (e) => {
        setPetImage(e.target.files[0]);
    };

    const handleDeleteChange = (e) => {
        setPetToDelete(e.target.value);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setPetSearchCriteria({ ...petSearchCriteria, [name]: value });
    };

    const handlePetSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            for (const key in petFormData) {
                formData.append(key, petFormData[key]);
            }
            formData.append('petImage', petImage);

            let response;
            if (formType === 'add') {
                response = await axios.post('http://localhost:8800/api/petManage/add', formData);
                alert(response.data);
            } else if (formType === 'update') {
                response = await axios.put(`http://localhost:8800/api/petManage/update/${petFormData.petID}`, formData);
                alert(response.data);
            }

            setPetFormData({
                petID: '',
                userID: '',
                adoID:'',
                disID:'',
                dcID:'',
                petName: '',
                petAge: '',
                petHeight: '',
                petWeight: '',
                petGender: '',
                petSkinColor: '',
                petBreed: ''
            });
            setPetImage(null);
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handlePetDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:8800/api/petManage/delete/${petToDelete}`);
            alert(response.data);
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handlePetSearch = async (e) => {
      e.preventDefault();
  
      try {
          const { searchBy, searchValue } = petSearchCriteria;
          let response;
          if (searchBy === 'all') {
              response = await axios.get('http://localhost:8800/api/petManage/findAll');
          } else if (searchBy === 'disID') { 
              response = await axios.get(`http://localhost:8800/api/petManage/findByDisID/${searchValue}`);
          }else {
              response = await axios.get(`http://localhost:8800/api/petManage/findBy${searchBy.charAt(0).toUpperCase() + searchBy.slice(1)}/${searchValue}`);
              }
        
          setFoundPets(response.data);
      } catch (error) {
          console.error("Error:", error);
          alert(`An error occurred: ${error.message}`);
      }
  };
  
    return (
        <div className="pet-management-container">
          <h2>
            { formType === 'add'
              ? 'Add Pet'
            : formType === 'update'
              ? 'Update Pet'
            : formType === 'delete'
              ? 'Delete Pet'
            : 'Find Pet'}
          </h2>
          <form
            onSubmit={
            formType === 'delete'
            ? handlePetDelete
            : formType === 'find'
            ? handlePetSearch
            : handlePetSubmit
            }
          >
          {formType !== 'delete' && formType !== 'find' && (
          <>
            <div className="form-row">
              <label>User ID</label>
              <input
                type="text"
                name="userID"
                value={petFormData.userID}
                onChange={handlePetChange}
                placeholder="Enter User ID"
                required
              />
            </div>

            <div className="form-row">
              <label>Pet Name</label>
              <input
                type="text"
                name="petName"
                value={petFormData.petName}
                onChange={handlePetChange}
                placeholder="Enter Pet Name"
                required
              />
            </div>

            <div className="form-row">
              <label>Pet Age</label>
              <input
                type="number"
                name="petAge"
                value={petFormData.petAge}
                onChange={handlePetChange}
                placeholder="Enter Pet Age"
                required
              />
            </div>

            <div className="form-row">
              <label>Pet Height</label>
              <input
                type="number"
                name="petHeight"
                value={petFormData.petHeight}
                onChange={handlePetChange}
                placeholder="Enter Pet Height"
                required
              />
            </div>

            <div className="form-row">
              <label>Pet Weight</label>
              <input
                type="number"
                name="petWeight"
                value={petFormData.petWeight}
                onChange={handlePetChange}
                placeholder="Enter Pet Weight"
                required
              />
            </div>

            <div className="form-row">
              <label>Pet Gender</label>
              <select
                name="petGender"
                value={petFormData.petGender}
                onChange={handlePetChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-row">
              <label>Pet Skin Color</label>
              <input
                type="text"
                name="petSkinColor"
                value={petFormData.petSkinColor}
                onChange={handlePetChange}
                placeholder="Enter Pet Skin Color"
                required
              />
            </div>

            <div className="form-row">
              <label>Pet Breed</label>
              <input
                type="text"
                name="petBreed"
                value={petFormData.petBreed}
                onChange={handlePetChange}
                placeholder="Enter Pet Breed"
                required
              />
            </div>

            <div className="form-row">
              <label>Pet Image</label>
              <input
                type="file"
                name="petImage"
                onChange={handlePetImageChange}
              />
            </div>
          </>
            )}

            {formType === 'update' && (
              <div className="form-row">
                <label>Pet ID</label>
                <input
                  type="text"
                  name="petID"
                  value={petFormData.petID}
                  onChange={handlePetChange}
                  placeholder="Enter Pet ID"
                  required
                />
              </div>
            )}

            {formType === 'delete' && (
              <div className="form-row">
                <label>Pet ID to Delete</label>
                <input
                  type="text"
                  value={petToDelete}
                  onChange={handleDeleteChange}
                  placeholder="Enter Pet ID to Delete"
                  required
                />
              </div>
            )}

            {formType === 'find' && (
              <>
                <div className="form-row">
                  <label>Search By</label>
                    <select name="searchBy" onChange={handleSearchChange} required>
                      <option value="">Select Search Criteria</option>
                      <option value="all">Find All Pets</option>
                      <option value="id">Find by ID</option>
                      <option value="color">Find by Color</option>
                      <option value="breed">Find by Breed</option>
                      <option value="age">Find by Age</option>
                      <option value="gender">Find by Gender</option>
                      <option value="disID">Find by Distributor ID</option>
                      <option value="adoid">Find by Adopter ID</option>
                      <option value="dcid">Find by Daycare ID</option>
                    </select>
                </div>

                {petSearchCriteria.searchBy !== 'all' && (
                  <div className="form-row">
                    <label>{`Enter ${petSearchCriteria.searchBy}`}</label>
                    <input
                      type="text"
                      name="searchValue"
                      placeholder={`Enter ${petSearchCriteria.searchBy}`}
                      onChange={handleSearchChange}
                      required
                    />
                  </div>
                )}
              </>
              )}

                    <button type="submit">
            {formType === 'delete'
              ? 'Delete'
              : formType === 'find'
              ? 'Search'
              : formType === 'add'
              ? 'Add Pet'
              : 'Update Pet'}
            </button>
          </form>

            {formType === 'find' && foundPets.length > 0 && (
              <div className="pet-found-pets">
                <h3>Found Pets:</h3>
                  {foundPets.map((pet) => (
                  <div key={pet.petID} className="pet-card">
                    <h4>{pet.petName}</h4>
                    <p>ID: {pet.petID}</p>
                    <p>Age: {pet.petAge}</p>
                    <p>Breed: {pet.petBreed}</p>
                    <p>Gender: {pet.petGender}</p>
                    <p>Color: {pet.petSkinColor}</p>
                    <p>Distributor ID: {pet.disID}</p>
                    <p>Adopter ID: {pet.adoID}</p>
                    <p>Daycare ID: {pet.dcID}</p>
                    <img src={`http://localhost:8800/uploads/${pet.petImage}`} alt={pet.petName} style={{width: '150px',height: '150px',borderRadius: '8px',objectFit: 'cover',}}/>
                  </div>
                  ))}
              </div>
            )}
        </div>
    );    
};

export default PetManagement;
