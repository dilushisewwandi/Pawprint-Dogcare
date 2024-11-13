import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PetProfile.css';

const PetProfile = () => {
    const { petID } = useParams();
    const [pet, setPet] = useState(null);
    const [userID, setUserID] = useState('');
    const [adoName, setAdopterName] = useState('');
    const [adoNIC, setAdopterNIC] = useState('');
    const [adoAge, setAdopterAge] = useState('');
    const [adoJob, setAdopterJob] = useState('');
    const [adoGender, setAdopterGender] = useState('');
    const [adoLocation, setAdopterLocation] = useState('');
    const [adoEmail, setAdopterEmail] = useState('');
    const [adoPhone, setAdopterPhone] = useState('');
    const [houseHoldComposition, setHouseholdComposition] = useState('');
    const [reasonForAdoption, setReasonForAdoption] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPetDetails();
    }, [petID]);

    const fetchPetDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/api/pet/petProfile/${petID}`);
            setPet(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pet details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const registerResponse = await axios.post('http://localhost:8800/api/adopterRegi/register', {
                userID,
                petID,
                adoName,
                adoNIC,
                adoAge,
                adoJob,
                adoGender,
                adoLocation,
                adoEmail,
                adoPhone,
                houseHoldComposition,
                reasonForAdoption
            });

            if (registerResponse.status === 201) {
                alert('Adopter registered successfully');
                try {
                    await axios.post(`http://localhost:8800/api/pet/adopt/${petID}`, {
                        petID,
                        userID,
                        adoName,
                        adoNIC,
                        adoAge,
                        adoJob,
                        adoGender,
                        adoLocation,
                        adoEmail,
                        adoPhone,
                        houseHoldComposition,
                        reasonForAdoption
                    });
                    alert("Adoption request sent to the distributor successfully!");
                } catch (error) {
                    console.error('Error sending adoption request:', error);
                    alert("Failed to send adoption request.");
                }
            } else {
                console.error('Error storing data:', registerResponse.status);
                alert('Failed to register adopter.');
            }
        } catch (error) {
            console.error('An error occurred during registration:', error);
            alert('An error occurred during registration.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!pet) {
        return <p>No pet found.</p>;
    }

    return (
    <div className="pet-profile-page">
        <div className="pet-profile-container">
            <img
                src={`http://localhost:8800/uploads/${pet.petImage}`}
                alt={pet.petName}
                className="adopt-pet-image"
            />
            <div className="pet-details">
                <h2>{pet.petName}</h2>
                <p><strong>Pet ID:</strong> {pet.petID}</p>
                <p><strong>Breed:</strong> {pet.petBreed}</p>
                <p><strong>Age:</strong> {pet.petAge} months</p>
                <p><strong>Gender:</strong> {pet.petGender}</p>
                <p><strong>Skin Color:</strong> {pet.petSkinColor}</p>
                <p><strong>Height:</strong> {pet.petHeight} cm</p>
                <p><strong>Weight:</strong> {pet.petWeight} kg</p>
            </div>

            <div className="distributor-details">
                <h3>Distributor Details:</h3>
                <p><strong>Name:</strong> {pet.disName}</p>
                <p><strong>Email:</strong> {pet.disEmail}</p>
                <p><strong>Phone:</strong> {pet.disPhone}</p>
                <p><strong>Location:</strong> {pet.disLocation}</p>
            </div>

            <div className="health-card-details">
                <h3>Health Details:</h3>
                <p><strong>Health Issues:</strong> {pet.healthIssues}</p>
                <p><strong>Last Checkup Date:</strong> {pet.lastCheckupDate}</p>
            </div>
        </div>

       
        <div className="adopt-form-container">
            <h1 className="adopt-welcome-message">Welcome, Future Adopter!</h1>
            <div className="adopt-registration-card">
                <div className="adopt-registration-card-body">
                    <h2 className="adopt-regi-form-name">Adopter Registration</h2>
                    <form onSubmit={handleSubmit} className="adopt-form">
                        <div className="adopt-form-group">
                            <label>User ID</label>
                            <input
                                type="text"
                                value={userID}
                                onChange={(e) => setUserID(e.target.value)}
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Pet ID</label>
                            <input
                                type="text"
                                value={petID}
                                readOnly
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Adopter Name</label>
                            <input
                                type="text"
                                value={adoName}
                                onChange={(e) => setAdopterName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Adopter NIC</label>
                            <input
                                type="text"
                                value={adoNIC}
                                onChange={(e) => setAdopterNIC(e.target.value)}
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Adopter Age</label>
                            <input
                                type="number"
                                value={adoAge}
                                onChange={(e) => setAdopterAge(e.target.value)}
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Adopter Job</label>
                            <input
                                type="text"
                                value={adoJob}
                                onChange={(e) => setAdopterJob(e.target.value)}
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Adopter Gender</label>
                            <input
                                type="text"
                                value={adoGender}
                                onChange={(e) => setAdopterGender(e.target.value)}
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Adopter Location</label>
                            <input
                                type="text"
                                value={adoLocation}
                                onChange={(e) => setAdopterLocation(e.target.value)}
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Adopter Email</label>
                            <input
                                type="email"
                                value={adoEmail}
                                onChange={(e) => setAdopterEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Adopter Phone</label>
                            <input
                                type="text"
                                value={adoPhone}
                                onChange={(e) => setAdopterPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Household Composition</label>
                            <input
                                type="text"
                                value={houseHoldComposition}
                                onChange={(e) => setHouseholdComposition(e.target.value)}
                                required
                            />
                        </div>
                        <div className="adopt-form-group">
                            <label>Reason for Adoption</label>
                            <input
                                type="text"
                                value={reasonForAdoption}
                                onChange={(e) => setReasonForAdoption(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="adopt-regi-submit">
                            Submit Adoption Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

};

export default PetProfile;











