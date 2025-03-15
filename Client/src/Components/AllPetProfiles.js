// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AllPetProfile.css';

// const AllPetProfiles = () => {
//     const [pets, setPets] = useState([]);
//     const [searchCriteria, setSearchCriteria] = useState({
//           petID:''
//     });

//     useEffect(() => {
//         fetchAllPetProfiles();
//     }, []);

//     const fetchAllPetProfiles = async () => {
//         try {
//             const response = await axios.get('http://localhost:8800/api/pet/petProfiles');
//             setPets(response.data);
//         } catch (error) {
//             console.error('Error fetching all pet profiles:', error);
//         }
//     };

    
//   const handleSearchChange = (e) => {
//     setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
//   };

//   const filteredPets = pets.filter((pet) =>
//     (searchCriteria.petID === '' || pet.petID.toLowerCase().includes(searchCriteria.petID.toLowerCase()))
//   );

//     if (pets.length === 0) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <section className="hp-hero-section">
//                 <div className="hp-hero-content">
//                     <h1>Meet Our Pets and Explore Their Health Journeys</h1>
//                     <p>Find detailed profiles and health updates of each pet, all in one place. Ready to find your new best friend?</p>
//                 </div>
//             </section>

//             <div>
//                 <h2>Search your favourite pet's health profile</h2>
//             </div>

//             {/* Search Bar Section */}
//             <div className="search-bar">
//                 <input
//                     type="text"
//                     name="petID"
//                     placeholder="Search by Pet ID"
//                     value={searchCriteria.petID}
//                     onChange={handleSearchChange}
//                 />
//             </div>

//             <div className="all-pet-profiles-container">
//                 {pets.map((pet) => (
//                     <PetProfile key={pet.petID} pet={pet} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// const PetProfile = ({ pet }) => {
//     const [healthProfile, setHealthProfile] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchHealthProfile = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8800/api/healthcard/getHealthProfile/${pet.petID}`);
//                 setHealthProfile(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching health profile:', error);
//                 setLoading(false);
//             }
//         };

//         fetchHealthProfile();
//     }, [pet.petID]);

//     return (
//         <div className="pet-profile-card">
//             <img src={`http://localhost:8800/uploads/${pet.petImage}`} alt={pet.petName} className="pet-image" />
//             <div className="pet-details">
//                 <h2>{pet.petName}</h2>
//                 <p><strong>Pet ID:</strong> {pet.petID}</p>
//                 <p><strong>Breed:</strong> {pet.petBreed}</p>
//                 <p><strong>Age:</strong> {pet.petAge} months</p>
//                 <p><strong>Gender:</strong> {pet.petGender}</p>
//                 <p><strong>Skin Color:</strong> {pet.petSkinColor}</p>
//                 <p><strong>Height:</strong> {pet.petHeight} cm</p>
//                 <p><strong>Weight:</strong> {pet.petWeight} kg</p>
//             </div>

//             <div className="health-card-details">
//                 {loading ? (
//                     <p>Loading health profile...</p>
//                 ) : healthProfile ? (
//                     <>
//                         <h3>Health Card</h3>
//                         <p><strong>Assigned Doctor:</strong> {healthProfile.vetName}</p>
//                         <p><strong>Specialzation:</strong> {healthProfile.vetSpecialization}</p>
//                         <h4>Vaccine Details:</h4>
//                         <p><strong>Name:</strong> {healthProfile.vName}</p>
//                         <p><strong>Date:</strong> {healthProfile.vDate}</p>
//                         <p><strong>Dose:</strong> {healthProfile.vDose}</p>
//                         <p><strong>Status:</strong> {healthProfile.vStatus}</p>
//                         <p><strong>Due Date for Next:</strong> {healthProfile.dueDateForNext}</p>

//                         <h4>Other Details:</h4>
//                         <p><strong>Health Issues:</strong> {healthProfile.healthIssues}</p>
//                         <p><strong>Last Checkup Date:</strong> {healthProfile.lastCheckupDate}</p>
//                     </>
//                 ) : (
//                     <p>No health profile available for this pet.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AllPetProfiles;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllPetProfile.css';

const AllPetProfiles = () => {
    const [pets, setPets] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
          petID:''
    });

    useEffect(() => {
        fetchAllPetProfiles();
    }, []);

    const fetchAllPetProfiles = async () => {
        try {
            const response = await axios.get('http://localhost:8800/api/pet/petProfiles');
            setPets(response.data);
        } catch (error) {
            console.error('Error fetching all pet profiles:', error);
        }
    };

    
  const handleSearchChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

//   const filteredPets = pets.filter((pet) =>
//     (searchCriteria.petID === '' || pet.petID.toLowerCase().includes(searchCriteria.petID.toLowerCase()))
//   );

  const filteredPets = pets.filter((pet) =>
    searchCriteria.petID === '' || pet.petID.toString().toLowerCase().includes(searchCriteria.petID.toLowerCase())
  );
  

    if (pets.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <section className="hp-hero-section">
                <div className="hp-hero-content">
                    <h1>Meet Our Pets and Explore Their Health Journeys</h1>
                    <p>Find detailed profiles and health updates of each pet, all in one place. Ready to find your new best friend?</p>
                </div>
            </section>

            <div>
                <h2>Search your favourite pet's health profile</h2>
            </div>

            {/* Search Bar Section */}
            <div className="search-bar">
                <input
                    type="text"
                    name="petID"
                    placeholder="Search by Pet ID"
                    value={searchCriteria.petID}
                    onChange={handleSearchChange}
                />
            </div>
            
            <div className="all-pet-profiles-container">
                {filteredPets.map((pet) => (
                    <PetProfile key={pet.petID} pet={pet} />
                ))}
            </div>
        </div>
    );
};

const PetProfile = ({ pet }) => {
    const [healthProfile, setHealthProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHealthProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/healthcard/getHealthProfile/${pet.petID}`);
                setHealthProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching health profile:', error);
                setLoading(false);
            }
        };

        fetchHealthProfile();
    }, [pet.petID]);

    return (
        <div className="pet-profile-card">
            <img src={`http://localhost:8800/uploads/${pet.petImage}`} alt={pet.petName} className="pet-image" />
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

            <div className="health-card-details">
                {loading ? (
                    <p>Loading health profile...</p>
                ) : healthProfile ? (
                    <>
                        <h3>Health Card</h3>
                        <p><strong>Assigned Doctor:</strong> {healthProfile.vetName}</p>
                        <p><strong>Specialzation:</strong> {healthProfile.vetSpecialization}</p>
                        <h4>Vaccine Details:</h4>
                        <p><strong>Name:</strong> {healthProfile.vName}</p>
                        <p><strong>Date:</strong> {healthProfile.vDate}</p>
                        <p><strong>Dose:</strong> {healthProfile.vDose}</p>
                        <p><strong>Status:</strong> {healthProfile.vStatus}</p>
                        <p><strong>Due Date for Next:</strong> {healthProfile.dueDateForNext}</p>

                        <h4>Other Details:</h4>
                        <p><strong>Health Issues:</strong> {healthProfile.healthIssues}</p>
                        <p><strong>Last Checkup Date:</strong> {healthProfile.lastCheckupDate}</p>
                    </>
                ) : (
                    <p>No health profile available for this pet.</p>
                )}
            </div>
        </div>
    );
};

export default AllPetProfiles;



