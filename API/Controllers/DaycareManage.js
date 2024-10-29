import { db } from "../Connect.js";

//add a daycare
export const addDaycare = (req, res) => {
    const {userID,dcID,dcName,dcLocation,dcPhone,dcEmail,openDays,openTimes,noOfStaffMembers,amenitiesOffered,safetyFeatures } = req.body;

    const q = "INSERT INTO daycare(`userID`, `dcID`, `dcName`,`dcLocation`,`dcPhone`,`dcEmail`,`openDays`,`openTimes`,`noOfStaffMembers`,`amenitiesOffered`,`safetyFeatures`) VALUES (?)";
    const values = [userID,dcID,dcName,dcLocation,dcPhone,dcEmail,openDays,openTimes,noOfStaffMembers,amenitiesOffered,safetyFeatures];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error('Error inserting daycare:', err); 
            return res.status(500).json({ message: 'Error inserting daycare', error: err });
        }
        return res.status(201).json("Daycare has been added successfully.");
    });
};

//update a daycare
export const updateDaycare = (req, res) => {
    const { userID, dcName, dcLocation, dcPhone, dcEmail, openDays, openTimes, noOfStaffMembers, amenitiesOffered, safetyFeatures } = req.body;
    const dcID = req.params.id;

    // Validate required fields
    if (!userID || !dcName || !dcLocation || !dcPhone || !dcEmail || !openDays || !openTimes || !noOfStaffMembers || !amenitiesOffered || !safetyFeatures) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Validate phone number
    if (!dcPhone.match(/^\d{10}$/)) {
        return res.status(400).json({ error: "Invalid phone number. It should be 10 digits." });
    }

    // Validate integer fields
    if (isNaN(parseInt(dcPhone)) || isNaN(parseInt(noOfStaffMembers))) {
        return res.status(400).json({ error: "Phone number and number of staff members must be valid integers." });
    }

    console.log("Updating daycare with ID:", dcID);
    console.log("Update values:", { userID, dcName, dcLocation, dcPhone, dcEmail, openDays, openTimes, noOfStaffMembers, amenitiesOffered, safetyFeatures });

    const q = `UPDATE daycare SET userID = ?, dcName = ?, dcLocation = ?, dcPhone = ?, dcEmail = ?, openDays = ?, openTimes = ?, noOfStaffMembers = ?, amenitiesOffered = ?, safetyFeatures = ? WHERE dcID = ?`;

    db.query(q, [userID, dcName, dcLocation, dcPhone, dcEmail, openDays, openTimes, noOfStaffMembers, amenitiesOffered, safetyFeatures,dcID], (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Internal Server Error", details: err });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "No daycare found with the specified ID." });
        }

        return res.status(200).json("Daycare details have been updated successfully.");
    });
};

//delete a daycare
export const deleteDaycare = (req, res) => {
    const daycareId = req.params.id;

    const q = "DELETE FROM daycare WHERE dcID = ?";

    db.query(q, [daycareId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Daycare has been deleted successfully.");
    });
};

// Find daycare by ID
export const findDaycareById = (req, res) => {
    const daycareId = req.params.id;

    const q = "SELECT * FROM daycare WHERE dcID = ?";

    db.query(q, [daycareId], (err, data) => {
        if (err) {
            console.error('Error finding daycare by ID:', err);
            return res.status(500).json({ message: 'Error finding daycare by ID', error: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'No daycare found with the specified ID' });
        }
        return res.status(200).json(data[0]);
    });
};
// Find daycare by userID
export const findDaycareByUserId = (req, res) => {
    const userID = req.params.id;

    const q = "SELECT * FROM daycare WHERE userID = ?";

    db.query(q, [userID], (err, data) => {
        if (err) {
            console.error('Error finding daycare by userID:', err);
            return res.status(500).json({ message: 'Error finding daycare by user ID', error: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'No daycare found with the specified user ID' });
        }
        return res.status(200).json(data[0]);
    });
};

// Find daycare by Location
export const findDaycareByLocation = (req, res) => {
    console.log('Request received for location:', req.params.location);
    const location = req.params.location;

    const q = "SELECT * FROM daycare WHERE dcLocation = ?";

    db.query(q, [location], (err, data) => {
        if (err) {
            console.error('Error finding daycare by location:', err);
            return res.status(500).json({ message: 'Error finding daycare by location', error: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'No daycare found at the specified location' });
        }
        return res.status(200).json(data);
    });
};

// Find daycare by Amenities Offered
export const findDaycareByAmenities = (req, res) => {
    const amenities = req.params.amenities;

    const q = "SELECT * FROM daycare WHERE amenitiesOffered LIKE ?";

    db.query(q, [`%${amenities}%`], (err, data) => {
        if (err) {
            console.error('Error finding daycare by amenities:', err);
            return res.status(500).json({ message: 'Error finding daycare by amenities', error: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'No daycare found with the specified amenities' });
        }
        return res.status(200).json(data);
    });
};

// Find daycare by Safety Features
export const findDaycareBySafety = (req, res) => {
    const safetyFeatures = req.params.safety;

    const q = "SELECT * FROM daycare WHERE safetyFeatures LIKE ?";

    db.query(q, [`%${safetyFeatures}%`], (err, data) => {
        if (err) {
            console.error('Error finding daycare by safety features:', err);
            return res.status(500).json({ message: 'Error finding daycare by safety features', error: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'No daycare found with the specified safety features' });
        }
        return res.status(200).json(data);
    });
};

// Find all daycares
export const findAllDaycares = (req, res) => {
    const q = "SELECT * FROM daycare";

    db.query(q, (err, data) => {
        if (err) {
            console.error('Error finding all daycares:', err);
            return res.status(500).json({ message: 'Error finding all daycares', error: err });
        }
        return res.status(200).json(data);
    });
};
