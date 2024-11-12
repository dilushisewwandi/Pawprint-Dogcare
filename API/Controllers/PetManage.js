import { db } from "../Connect.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Configure path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Add pet
export const addPet = (req, res) => {
    const { userID, petName, petAge, petHeight, petWeight, petGender, petSkinColor, petBreed } = req.body;
    const petImage = req.file ? req.file.filename : '';

    console.log("Received data:", req.body, "Received file:", req.file);

    // Query to get the disID based on userID
    const fetchDisIDQuery = "SELECT disID FROM distributor WHERE userID = ?";
    
    db.query(fetchDisIDQuery, [userID], (err, distributorData) => {
        if (err) {
            console.error("Failed to fetch disID:", err);
            return res.status(500).json({ error: "Failed to fetch distributor ID", details: err });
        }

        if (distributorData.length === 0) {
            return res.status(404).json({ error: "Distributor not found for the given userID" });
        }

        const disID = distributorData[0].disID;

        // Insert the pet into the pet table along with the disID
        const insertPetQuery = "INSERT INTO pet(`disID`,`petName`, `petAge`, `petHeight`, `petWeight`, `petGender`, `petSkinColor`, `petBreed`, `petImage`) VALUES (?)";
        const petValues = [disID, petName, petAge, petHeight, petWeight, petGender, petSkinColor, petBreed, petImage];

        db.query(insertPetQuery, [petValues], (err, data) => {
            if (err) {
                console.error("Failed to insert pet data:", err);
                return res.status(500).json({ error: "Failed to insert pet data", details: err });
            }

            return res.status(201).json("Pet has been added successfully.");
        });
    });
};


// Delete pet
export const deletePet = (req, res) => {
    const petID = req.params.id;
    console.log(`Attempting to delete pet with ID: ${petID}`);

    const q = "SELECT petImage FROM pet WHERE petID = ?";
    db.query(q, [petID], (err, data) => {
        if (err) {
            console.error("Error fetching pet image:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Pet not found" });
        }

        const petImage = data[0].petImage;
        if (petImage) {
            fs.unlink(path.join(__dirname, "../uploads/", petImage), (err) => {
                if (err) console.error("Failed to delete image:", err);
            });
        }

        const deleteQuery = "DELETE FROM pet WHERE petID = ?";
        db.query(deleteQuery, [petID], (err, data) => {
            if (err) {
                console.error("Error deleting pet:", err);
                return res.status(500).json(err);
            }
            return res.status(200).json("Pet has been deleted successfully.");
        });
    });
};

// Update pet
export const updatePet = (req, res) => {
    const { userID, petName, petAge, petHeight, petWeight, petGender, petSkinColor, petBreed } = req.body;
    const petID = req.params.id;
    const petImage = req.file ? req.file.filename : '';

    // Fetch the old image to delete it if a new one is uploaded
    const getOldImageQuery = 'SELECT petImage FROM pet WHERE petID = ?';
    db.query(getOldImageQuery, [petID], (err, data) => {
        if (err) {
            console.error("Failed to fetch old image:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }

        const oldImage = data[0].petImage;
        if (oldImage && req.file) {
            fs.unlink(path.join(__dirname, "../uploads/", oldImage), (err) => {
                if (err) console.error("Failed to delete old image:", err);
            });
        }

        // Fetch disID from distributor based on userID
        const fetchDisIDQuery = "SELECT disID FROM distributor WHERE userID = ?";
        db.query(fetchDisIDQuery, [userID], (err, distributorData) => {
            if (err) {
                console.error("Failed to fetch disID:", err);
                return res.status(500).json({ error: "Failed to fetch distributor ID", details: err });
            }

            if (distributorData.length === 0) {
                return res.status(404).json({ error: "Distributor not found for the given userID" });
            }

            const disID = distributorData[0].disID;

            // Update the pet details, using disID instead of userID
            const updateQuery = 'UPDATE pet SET disID = ?, petName = ?, petAge = ?, petHeight = ?, petWeight = ?, petGender = ?, petSkinColor = ?, petBreed = ?, petImage = ? WHERE petID = ?';
            db.query(updateQuery, [disID, petName, petAge, petHeight, petWeight, petGender, petSkinColor, petBreed, petImage, petID], (err, data) => {
                if (err) {
                    console.error("Failed to update pet data:", err);
                    return res.status(500).json({ error: "Failed to update pet data", details: err });
                }

                return res.status(200).json("Pet details have been updated successfully.");
            });
        });
    });
};

// Find all pets
export const findAllPets = (req, res) => {
    const q = "SELECT * FROM pet";

    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching all pets:", err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

// Find pet by ID
export const findByID = (req, res) => {
    const petID = req.params.id;
    console.log(`Received request to find pet with ID: ${petID}`);

    const q = "SELECT * FROM pet WHERE petID = ?";
    db.query(q, [petID], (err, data) => {
        if (err) {
            console.error("Error fetching pet data:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Pet not found" });
        }

        console.log("Query result:", data); 
        return res.status(200).json(data);
    });
};

// Find pet by color
export const findPetByColor = (req, res) => {
    const color = req.params.color;

    const q = "SELECT * FROM pet WHERE petSkinColor = ?";
    db.query(q, [color], (err, data) => {
        if (err) {
            console.error("Error fetching pets by color:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "No pets found with the specified color" });
        }

        return res.status(200).json(data);
    });
};

// Find pet by breed
export const findPetByBreed = (req, res) => {
    const breed = req.params.breed;

    const q = "SELECT * FROM pet WHERE petBreed = ?";
    db.query(q, [breed], (err, data) => {
        if (err) {
            console.error("Error fetching pets by breed:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "No pets found with the specified breed" });
        }

        return res.status(200).json(data);
    });
};

// Find pet by age
export const findPetByAge = (req, res) => {
    const age = req.params.age;

    const q = "SELECT * FROM pet WHERE petAge = ?";
    db.query(q, [age], (err, data) => {
        if (err) {
            console.error("Error fetching pets by age:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "No pets found with the specified age" });
        }

        return res.status(200).json(data);
    });
};

// Find pet by gender
export const findPetByGender = (req, res) => {
    const gender = req.params.gender;

    const q = "SELECT * FROM pet WHERE petGender = ?";
    db.query(q, [gender], (err, data) => {
        if (err) {
            console.error("Error fetching pets by gender:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "No pets found with the specified gender" });
        }

        return res.status(200).json(data);
    });
};

// Find pet by distributor ID 
export const findPetByDistributorID = (req, res) => {
    const disID = req.params.disID;

    const q = "SELECT * FROM pet WHERE disID = ?";
    db.query(q, [disID], (err, data) => {
        if (err) {
            console.error("Database error:", err);
           // console.error("Error fetching pets by distributor ID:", err);
            //return res.status(500).json(err);
            return res.status(500).json({ message: "An error occurred while retrieving pets." });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "No pets found with the specified distributor ID" });
        }

        return res.status(200).json(data);
    });
};

// Find pet by adopter ID
export const findPetByAdoID = (req, res) => {
    const adoID = req.params.adoID;

    const q = "SELECT * FROM pet WHERE adoID = ?";
    db.query(q, [adoID], (err, data) => {
        if (err) {
            console.error("Error fetching pets by adopter ID:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "No pets found with the specified adopter ID" });
        }

        return res.status(200).json(data);
    });
};

// Find pet by daycare ID 
export const findPetByDcID = (req, res) => {
    const dcID = req.params.dcID;

    const q = "SELECT * FROM pet WHERE dcID = ?";
    db.query(q, [dcID], (err, data) => {
        if (err) {
            console.error("Error fetching pets by daycare ID:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "No pets found with the specified daycare ID" });
        }

        return res.status(200).json(data);
    });
};