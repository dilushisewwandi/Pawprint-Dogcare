import { db } from "../Connect.js";

export const registerAdopterAndAdoptPet = (req, res) => {
    const {adoName, adoNIC, adoAge, adoJob, adoGender, adoLocation, adoEmail, adoPhone, houseHoldComposition, reasonForAdoption, userID, petID} = req.body;

    console.log("Received data:", req.body);

    //check if required fields are not null or undefined
    if (!adoName || !adoNIC || !adoAge || !adoJob || !adoGender || !adoLocation || !adoEmail || !adoPhone || !houseHoldComposition || !reasonForAdoption || !userID || !petID) {
        return res.status(400).json({ error: "All fields are required and must not be null." });
    }

    // Fetch user details from the user table using the provided userID
    const getUserQuery = "SELECT username, email FROM user WHERE userID = ?";

    db.query(getUserQuery, [userID], (userErr, userResult) => {
        if (userErr) {
            console.error("Database query failed:", userErr);
            return res.status(500).json({ error: "Internal Server Error", details: userErr });
        }

        if (userResult.length === 0) {
            return res.status(400).json({ error: "This user ID is wrong, not assigned, or does not exist. Please sign up." });
        }

        const { username, email } = userResult[0];

        // Check if the provided name and email match the ones from the user table
        if (adoName !== username || adoEmail !== email) {
            return res.status(400).json({ error: "Name or email does not match the user information" });
        }

        // Check if the adopter already exists in the adopter table
        const checkAdopterQuery = "SELECT adoID FROM adopter WHERE userID = ?";

        db.query(checkAdopterQuery, [userID], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("Error checking adopter:", checkErr);
                return res.status(500).json({ error: "Error checking adopter existence." });
            }

            let adopterID;

            if (checkResult.length > 0) {
                adopterID = checkResult[0].adoID;
            } else {
                const insertAdopterQuery = `
                    INSERT INTO adopter(userID, adoName, adoNIC, adoAge, adoJob, adoGender, adoLocation, adoEmail, adoPhone, houseHoldComposition, reasonForAdoption)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                const adopterValues = [userID, adoName, adoNIC, adoAge, adoJob, adoGender, adoLocation, adoEmail, adoPhone, houseHoldComposition, reasonForAdoption];

                db.query(insertAdopterQuery, adopterValues, (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error('Error inserting adopter data:', insertErr);
                        return res.status(500).json({ message: 'Failed to insert adopter data' });
                    }
                    adopterID = insertResult.insertId;
                    proceedWithPetAdoption(adopterID);
                });
            }
            // If the adopter already exists, proceed with pet adoption using existing adoID
            if (adopterID) proceedWithPetAdoption(adopterID);
        });

        //Update pet table with adopter details
        const proceedWithPetAdoption = (adopterID) => {
            const updatePetQuery = `UPDATE pet SET adoID = ?, status = 'Requested' WHERE petID = ?`;
            const petValues = [adopterID, petID];

            db.query(updatePetQuery, petValues, (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating pet table:', updateErr);
                    return res.status(500).json({ message: 'Failed to update pet table' });
                }

                if (updateResult.affectedRows === 0) {
                    return res.status(404).json({ error: "Pet not found or already adopted." });
                }

                return res.status(201).json({ message: "Adoption request sent to the distributor successfully." });
            });
        };
    });
};

// Get adoption requests for a distributor based on their userID
export const getAdoptionRequestsByDistributor = (req, res) => {
    const { userID } = req.params;

    //check if userID is provided
    if (!userID) {
        return res.status(400).json({ error: "Distributor userID is required." });
    }

    //get adoption requests where the distributor's pets have been requested
    const adoptionRequestsQuery = `
        SELECT 
            p.petID, p.petName, p.petBreed,
            a.adoID, a.adoName, a.adoEmail, a.adoPhone, a.adoLocation, a.reasonForAdoption
        FROM 
            pet p
        JOIN 
            adopter a ON p.adoID = a.adoID
        JOIN 
            distributor d ON p.disID = d.disID
        WHERE 
            d.userID = ? AND p.status = 'Requested'
    `;

    db.query(adoptionRequestsQuery, [userID], (err, results) => {
        if (err) {
            console.error('Error fetching adoption requests:', err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No adoption requests found for this distributor." });
        }

        return res.status(200).json({ adoptionRequests: results });
    });
};

// Register a pet
export const registerPet = (req, res) => {
    const { userID, petName, petAge, petHeight, petWeight, petGender, petSkinColor, petBreed } = req.body;
    const petImage = req.file ? req.file.filename : '';

    // Check if userID exists in the distributor table and fetch disID
    const checkDistributorQuery = "SELECT disID FROM distributor WHERE userID = ?";

    db.query(checkDistributorQuery, [userID], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("Error checking distributor by userID:", checkErr);
            return res.status(500).json({ error: "Internal Server Error", details: checkErr });
        }

        if (checkResult.length === 0) {
            return res.status(400).json({ error: "Distributor not found for the given userID." });
        }

        const disID = checkResult[0].disID;
        const insertPetQuery = `INSERT INTO pet(disID, petName, petAge, petHeight, petWeight, petGender, petSkinColor, petBreed, petImage) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [disID, petName, petAge, petHeight, petWeight, petGender, petSkinColor, petBreed, petImage];

        db.query(insertPetQuery, values, (err, data) => {
            if (err) {
                console.error("Database query failed:", err);
                return res.status(500).json({ error: "Internal Server Error", details: err });
            }
            return res.status(201).json("Pet has been registered successfully.");
        });
    });
};

//get pets by distributor id
export const getPetsByDistributor = (req, res) => {
    const disID = req.params.id;

    const q = "SELECT * FROM pet WHERE disID = ?";
    db.query(q, [disID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

// Get all pets
export const getAllPets = (req, res) => {
    const q = "SELECT * FROM pet";
    db.query(q, (err, data) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json(err);
        }
        console.log('Pets data from database:', data);
        return res.status(200).json(data);
    });
};

//Get Pet Profile
export const getPetProfile = (req, res) => {
    const petID = req.params.petID;
    const q = `
        SELECT p.*, 
               d.disName, d.disEmail, d.disPhone, d.disLocation,
               h.healthIssues, h.lastCheckupDate
        FROM pet p
        LEFT JOIN distributor d ON p.disID = d.disID
        LEFT JOIN healthcard h ON p.petID = h.petID
        WHERE p.petID = ?;
    `;
    db.query(q, [petID], (err, data) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        return res.status(200).json(data[0]);
    });
};

// Get all Pet Profiles
export const getAllPetProfiles = (req, res) => {
    const q = `
        SELECT p.*, 
               d.disName, d.disEmail, d.disPhone, d.disLocation,
               h.healthIssues, h.lastCheckupDate,
               v.vName, v.vDate, v.vStatus
        FROM pet p
        LEFT JOIN distributor d ON p.disID = d.disID
        LEFT JOIN healthcard h ON p.petID = h.petID
        LEFT JOIN healthcard_vaccine hv ON h.cardID = hv.cardID
        LEFT JOIN vaccine v ON hv.vID = v.vID;
    `;
    
    db.query(q, (err, data) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }

        return res.status(200).json(data);
    });
};

