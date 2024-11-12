import { db } from '../Connect.js';
import dotenv from 'dotenv';

dotenv.config();

//register vet
export const registerVet = (req, res) => {
    const {vetName,vetEmail,vetSpecialization,vetPhone,clinic,userID} = req.body;

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

        // Check if the provided email and userID match the ones from the user table
        const { username, email } = userResult[0];
        if((vetEmail !== email) && (vetName !==username)) {
            return res.status(400).json({ error: "Email does not match the user information" });
        }

        // Check if veterinarian with the same userID already exists
        const checkQuery = "SELECT * FROM veterinarian WHERE userID = ?";
        db.query(checkQuery, [userID], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("Database query failed:", checkErr);
                return res.status(500).json({ error: "Internal Server Error", details: checkErr });
            }

            if (checkResult.length > 0) {

                return res.status(200).json({
                    message: "You are already registered", 
                });
            }

            //If userID does not exist in the veterinarian table
            const insertQuery = `INSERT INTO veterinarian (vetName, vetEmail, vetSpecialization, vetPhone, clinic, userID) VALUES (?,?,?,?,?,?)`;
            const values = [vetName, vetEmail, vetSpecialization, vetPhone, clinic, userID];

            db.query(insertQuery, values, (insertErr, data) => {
                if (insertErr) {
                    console.error("Database query failed:", insertErr);
                    return res.status(500).json({ error: "Internal Server Error", details: insertErr });
                }
                return res.status(201).json({ message: "Veterinarian has been registered successfully." });
            });
        });
    });
};

//get all vet profiles
export const getAllVetProfiles = (req, res) => {
    const q = "SELECT * FROM veterinarian";
    db.query(q, (err, data) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json(err);
        }
        console.log('Vets data from database:', data);
        return res.status(200).json(data);
    });
};

//book vet appointments
export const bookVetAppointment = (req, res) => {
    const { appointmentDate, appointmentTime, vetID, petName, petAge, petBreed, reason, name, phone, email, userID } = req.body;

    // Validate userID and email
    const validateUserQuery = "SELECT * FROM user WHERE userID = ? AND email = ?";
    db.query(validateUserQuery, [userID, email], (userErr, userResults) => {
        if (userErr) {
            console.error('Error validating user:', userErr);
            return res.status(500).json({ message: 'Database query failed during user validation.' });
        }

        if (userResults.length === 0) {
            return res.status(401).json({ message: 'User not found or email mismatch.' });
        }

        // Find disID using the userID
        const findDistributorQuery = "SELECT disID FROM distributor WHERE userID = ?";
        db.query(findDistributorQuery, [userID], (distributorErr, distributorResults) => {
            if (distributorErr) {
                console.error('Error finding distributor:', distributorErr);
                return res.status(500).json({ message: 'Error finding distributor.' });
            }

            if (distributorResults.length === 0) {
                return res.status(404).json({ message: 'Distributor not found for this user.' });
            }

            const disID = distributorResults[0].disID;

            // Find the pet using the provided details
            const findPetQuery = "SELECT petID FROM pet WHERE petName = ? AND disID = ? AND petBreed = ?";
            db.query(findPetQuery, [petName, disID, petBreed], (findErr, findResults) => {
                if (findErr) {
                    console.error('Error finding pet:', findErr);
                    return res.status(500).json({ message: 'Error finding pet.' });
                }

                if (findResults.length === 0) {
                    return res.status(404).json({ message: 'Pet not found.' });
                }

                const petID = findResults[0].petID;

                // Fetch vet details and proceed with booking
                const query = "SELECT * FROM veterinarian WHERE vetID = ?";
                db.query(query, [vetID], (vetErr, vetResults) => {
                    if (vetErr) {
                        console.error('Database query error:', vetErr);
                        return res.status(500).json({ message: 'Database query failed when fetching veterinarian.' });
                    }

                    if (vetResults.length === 0) {
                        return res.status(404).json({ message: 'Doctor not found.' });
                    }

                    // Insert appointment into vet_appointment table
                    const insertQuery = `INSERT INTO vet_appointment (appointmentDate, appointmentTime, vetID, disID, petID, petName, petAge, reason, name, phone, email)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                    db.query(insertQuery, [appointmentDate, appointmentTime, vetID, disID, petID, petName, petAge, reason, name, phone, email], (insertErr) => {
                        if (insertErr) {
                            console.error('Error inserting appointment:', insertErr);
                            return res.status(500).json({ message: 'Error inserting appointment.' });
                        }

                        res.status(200).json({ message: 'Appointment booked successfully.' });
                    });
                });
            });
        });
    });
};


//find vet appointments by userID
export const findVetAppointmentsByUserID = (req, res) => {
    const { userID } = req.params;

    // Find the vet's vetID using the userID
    const findVetQuery = "SELECT vetID FROM veterinarian WHERE userID = ?";
    db.query(findVetQuery, [userID], (vetErr, vetResults) => {
        if (vetErr) {
            console.error('Error finding veterinarian:', vetErr);
            return res.status(500).json({ message: 'Database query failed when finding veterinarian.' });
        }

        if (vetResults.length === 0) {
            return res.status(404).json({ message: 'Veterinarian not found for this user.' });
        }

        const vetID = vetResults[0].vetID;

        // Find appointments for this vetID
        const findAppointmentsQuery = "SELECT * FROM vet_appointment WHERE vetID = ?";
        db.query(findAppointmentsQuery, [vetID], (appointmentErr, appointmentResults) => {
            if (appointmentErr) {
                console.error('Error finding appointments:', appointmentErr);
                return res.status(500).json({ message: 'Database query failed when finding appointments.' });
            }

            if (appointmentResults.length === 0) {
                return res.status(404).json({ message: 'No appointments found for this veterinarian.' });
            }

            res.status(200).json(appointmentResults);
        });
    });
};

