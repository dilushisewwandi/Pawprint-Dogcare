import { db } from '../Connect.js';
import dotenv from 'dotenv';

dotenv.config();


//register a daycare
export const registerDaycare = (req, res) => {
    const {userID,dcName,dcLocation,dcPhone,dcEmail,openDays,openTimes,noOfStaffMembers,amenitiesOffered,safetyFeatures } = req.body;

    const q = "INSERT INTO daycare(`userID`, `dcName`,`dcLocation`,`dcPhone`,`dcEmail`,`openDays`,`openTimes`,`noOfStaffMembers`,`amenitiesOffered`,`safetyFeatures`) VALUES (?)";
    const values = [userID,dcName,dcLocation,dcPhone,dcEmail,openDays,openTimes,noOfStaffMembers,amenitiesOffered,safetyFeatures];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error('Error inserting daycare:', err); 
            return res.status(500).json({ message: 'Error inserting daycare', error: err });
        }
        return res.status(201).json("You daycare registered successfully.");
    });
};

//get all daycares
export const getAllDaycare = (req, res) => {
    const q = "SELECT * FROM daycare";
    db.query(q, (err, data) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json(err);
        }
        console.log('Daycare data from database:', data);
        return res.status(200).json(data);
    });
};

//book a daycare
export const bookDaycare = (req, res) => {
    const { userID, name, phone, email, petName, petAge, petBreed, bookingDate, bookingTime, dcID } = req.body;

    // Validate userID and email match in the user table
    const findUserQuery = "SELECT * FROM user WHERE userID = ? AND email = ?";
    db.query(findUserQuery, [userID, email], (userErr, userResults) => {
        if (userErr) {
            console.error('Error finding user:', userErr);
            return res.status(500).json({ message: 'Error finding user' });
        }

        if (userResults.length === 0) {
            return res.status(404).json({ message: 'User not found or userID and email do not match' });
        }

    // Fetch disID from the distributor table based on the userID
    const findDistributorQuery = "SELECT disID FROM distributor WHERE userID = ?";
    db.query(findDistributorQuery, [userID], (disErr, disResults) => {
        if (disErr) {
            console.error('Error finding distributor:', disErr);
            return res.status(500).json({ message: 'Error finding distributor' });
        }

        if (disResults.length === 0) {
            return res.status(404).json({ message: 'Distributor not found' });
        }

    const disID = disResults[0].disID;

    // Find the pet using the provided details
    const findPetQuery = "SELECT petID FROM pet WHERE petName = ? AND disID = ? AND petBreed = ?";
    db.query(findPetQuery, [petName, disID, petBreed], (findErr, findResults) => {
        if (findErr) {
            console.error('Error finding pet:', findErr);
            return res.status(500).json({ message: 'Error finding pet' });
        }

        if (findResults.length === 0) {
            return res.status(404).json({ message: 'Pet not found' });
        }

    const petID = findResults[0].petID;

    // Fetch the daycare details using dcID
    const findDaycareQuery = "SELECT * FROM daycare WHERE dcID = ?";
    db.query(findDaycareQuery, [dcID], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database query failed' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Daycare not found' });
        }

    const daycare = results[0];

    // Insert booking data into daycare_booking table
    const insertBookingQuery = `INSERT INTO daycare_booking (userID, dcID, petID, username, phone, email, bookingDate, bookingTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(insertBookingQuery, [userID, dcID, petID, name, phone, email, bookingDate, bookingTime], (insertErr) => {
        if (insertErr) {
            console.error('Error inserting booking data:', insertErr);
            return res.status(500).json({ message: 'Failed to insert booking data' });
        }

    const updatePetQuery = "UPDATE pet SET dcID = ? WHERE petID = ?";
    db.query(updatePetQuery, [dcID, petID], (updateErr) => {
        if (updateErr) {
            console.error('Error updating pet table:', updateErr);
            return res.status(500).json({ message: 'Failed to update pet table' });
        }

            return res.status(200).json({ message: 'Booking successful, and pet table updated' });
                        });
                    });
                });
            });
        });
    });
};

//find a daycare booking by userID
export const findDaycareBookingsByUserID= (req,res) => {
    const{userID} = req.params;

    const findBookingQuery = "SELECT dcID FROM daycare WHERE userID = ?";

    db.query(findBookingQuery, [userID],(bookingErr, bookingResults) =>{
        if(bookingErr){
            console.error('Error finding daycare:', bookingErr);
            return res.status(500).json({message:'Database query failed when finding daycare.'});
        }
        if(bookingResults.length ===0){
            return res.status(404).json({message:'Daycare not found for this user.'});
        }

    const dcID = bookingResults[0].dcID;

     const findBookingQuery = "SELECT * FROM daycare_booking WHERE dcID = ?";
        
     db.query(findBookingQuery, [dcID], (bookingErr, bookingResults) =>{
        if(bookingErr){
            console.error('Error finding bookings:', bookingErr);
            return res.status(500).json({ message: 'Database query failed when finding bookings.' });
        }

        if (bookingResults.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this daycare.' });
        }
        res.status(200).json(bookingResults);
        });
    });
};

//view daycare schedules by userID
export const viewDaycareScheduleByUserID = (req, res) => {
    const { userID } = req.params;

    // Query to get daycare ID (dcID) associated with the given userID
    const findDaycareQuery = "SELECT dcID FROM daycare WHERE userID = ?";

    db.query(findDaycareQuery, [userID], (daycareErr, daycareResults) => {
        if (daycareErr) {
            console.error('Error finding daycare:', daycareErr);
            return res.status(500).json({ message: 'Database query failed when finding daycare.' });
        }
        if (daycareResults.length === 0) {
            return res.status(404).json({ message: 'Daycare not found for this user.' });
        }

        const dcID = daycareResults[0].dcID;

    // Query to find bookings for the daycare using dcID
    const findBookingQuery = "SELECT bookingDate, bookingTime FROM daycare_booking WHERE dcID = ?";
        
    db.query(findBookingQuery, [dcID], (bookingErr, bookingResults) => {
        if (bookingErr) {
            console.error('Error finding bookings:', bookingErr);
            return res.status(500).json({ message: 'Database query failed when finding bookings.' });
        }

        if (bookingResults.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this daycare.' });
        }
        res.status(200).json(bookingResults);
        });
    });
};
