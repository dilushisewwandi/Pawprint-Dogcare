import { db } from "../Connect.js";

//Register distributor
export const registerDistributor = (req, res) => {
    const { disName, disEmail, disPhone, disLocation, userID } = req.body;

    console.log("Received data:", req.body);

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
        if (disName !== username || disEmail !== email) {
            return res.status(400).json({ error: "Name or email does not match the user information" });
        }

        // Check if distributor with the same userID already exists
        const checkQuery = "SELECT * FROM distributor WHERE userID = ?";
        db.query(checkQuery, [userID], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("Database query failed:", checkErr);
                return res.status(500).json({ error: "Internal Server Error", details: checkErr });
            }

            // Distributor with the same userID already exists
            if (checkResult.length > 0) {
                return res.status(200).json({
                    message: "You are already registered.",
                });
            }

            // Proceed with insertion if userID does not exist in the distributor table
            const insertQuery = "INSERT INTO distributor(disName, disEmail, disPhone, disLocation, userID) VALUES (?)";
            const values = [disName, disEmail, disPhone, disLocation, userID];

            db.query(insertQuery, [values], (insertErr, data) => {
                if (insertErr) {
                    console.error("Database query failed:", insertErr);
                    return res.status(500).json({ error: "Internal Server Error", details: insertErr });
                }
                return res.status(201).json({ message: "Distributor has been registered successfully." });
            });
        });
    });
};


