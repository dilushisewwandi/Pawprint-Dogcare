import { db } from "../Connect.js";

// Add a daycare
export const addDaycare = (req, res) => {
    const { userID, dcName, dcLocation, dcPhone, dcEmail, openDays, openTimes, noOfStaffMembers, amenitiesOffered, safetyFeatures } = req.body;

    const q = "INSERT INTO daycare(`userID`, `dcName`, `dcLocation`, `dcPhone`, `dcEmail`, `openDays`, `openTimes`, `noOfStaffMembers`, `amenitiesOffered`, `safetyFeatures`) VALUES (?)";
    const values = [userID, dcName, dcLocation, dcPhone, dcEmail, openDays, openTimes, noOfStaffMembers, amenitiesOffered, safetyFeatures];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error('Error inserting daycare:', err); 
            return res.status(500).json({ success: false, message: 'Error inserting daycare', error: err });
        }
        return res.status(201).json({ success: true, message: "Daycare has been added successfully.", data });
    });
};


// Update a daycare
export const updateDaycare = (req, res) => {
    const {dcName, dcLocation, dcPhone, dcEmail, openDays, openTimes, noOfStaffMembers, amenitiesOffered, safetyFeatures } = req.body;
    const dcID = req.params.id;

    const q = `UPDATE daycare SET dcName = ?, dcLocation = ?, dcPhone = ?, dcEmail = ?, openDays = ?, openTimes = ?, noOfStaffMembers = ?, amenitiesOffered = ?, safetyFeatures = ? WHERE dcID = ?`;

    db.query(q, [ dcName, dcLocation, dcPhone, dcEmail, openDays, openTimes, noOfStaffMembers, amenitiesOffered, safetyFeatures, dcID], (err, data) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ success: false, message: "Internal Server Error", error: err });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "No daycare found with the specified ID." });
        }

        return res.status(200).json({ success: true, message: "Daycare details have been updated successfully.", data });
    });
};


// Delete a daycare
export const deleteDaycare = (req, res) => {
    const dcID = req.params.id;

    const q = "DELETE FROM daycare WHERE dcID = ?";

    db.query(q, [dcID], (err, data) => {
        if (err) return res.status(500).json({ success: false, message: "Error deleting daycare", error: err });

        if (data.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "No daycare found with the specified ID." });
        }
        return res.status(200).json({ success: true, message: "Daycare has been deleted successfully." });
    });
};


// Find daycare by ID
export const findDaycareById = (req, res) => {
    const dcID = req.params.id;

    const q = "SELECT * FROM daycare WHERE dcID = ?";
    db.query(q, [dcID], (err, data) => {
        if (err) {
            console.error('Error finding daycare by ID:', err);
            return res.status(500).json({ success: false, message: 'Error finding daycare by ID', error: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ success: false, message: 'No daycare found with the specified ID' });
        }
        res.status(200).json(data); // Send the fetched data as a JSON response
    });
};

//find daycare by userID
export const findDaycareByUserId = (req, res) => {
    const userID = req.params.id;

    const q = "SELECT * FROM daycare WHERE userID = ?";
    db.query(q, [userID], (err, data) => {
        if (err) {
            console.error('Error finding daycare by User ID:', err);
            return res.status(500).json({ success: false, message: 'Error finding daycare by User ID', error: err });
        }
        if (data.length === 0) {
            return res.status(404).json({ success: false, message: 'No daycare found with the specified User ID' });
        }
        res.status(200).json(data); 
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
