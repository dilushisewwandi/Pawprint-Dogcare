// import { db } from "../Connect.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';

// dotenv.config();

// //user registration
// export const register = (req, res) => {
//     const { username, email, password, role } = req.body;

//     // Check if user exists
//     const q = "SELECT * FROM user WHERE username = ? OR email = ?";
//     db.query(q, [username, email], (err, data) => {
//         if (err) return res.status(500).json(err);
//         if (data.length) return res.status(409).json("User already exists!");

//         // Hash the password
//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(password, salt);

//         // Create a new user
//         const q = "INSERT INTO user(`username`, `email`, `password`, `role`) VALUES (?)";
//         const values = [[username, email, hashedPassword, role]]; 

//         db.query(q, values, (err, data) => {
//            if (err) {
//             console.error("Error inserting user:", err);
//             return res.status(500).json(err);
//         }
//             const userId = data.insertId; // Get the inserted user ID
//             return res.status(200).json({ message: "User has been created.", userId });
//         });
//     });
// };

// //user login
// export const login = (req, res) => {
//     const { userID, password } = req.body;

//     const q = "SELECT * FROM user WHERE userID = ?";
//     db.query(q, [userID], (err, data) => {
//         if (err) return res.status(500).json({ message: 'Server error', error: err });
//         if (data.length === 0) return res.status(404).json("User not found!");

//         const user = data[0];

//         // Check if the password is correct
//         const isPasswordCorrect = bcrypt.compareSync(password, user.password);
//         if (!isPasswordCorrect) return res.status(400).json("Wrong userID or password!");

//          // Generate JWT token
//          const token = jwt.sign({ id: user.userID, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//          // If login is successful
//          res.status(200).json({ token, message: "Login successful!", role: user.role, userId: user.userID });
//     });
// };

// // //user logout
// // export const logout = (req, res) => {
// //     // Destroy the session
// //     req.session.destroy((err) => {
// //         if (err) {
// //             return res.status(500).json({ error: "Failed to log out. Please try again." });
// //         }
// //         res.clearCookie('connect.sid'); 
// //         return res.status(200).json({ message: "Logged out successfully." });
// //     });
// // };


import { db } from "../Connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

// User registration
export const register = (req, res) => {
    const { username, email, password, role } = req.body;

    const q = "SELECT * FROM user WHERE username = ? OR email = ?";
    db.query(q, [username, email], (err, data) => {
        if (err) {
            console.error("Database query error during registration:", err);
            return res.status(500).json("Internal server error: " + err.message);  
        }
        if (data.length) {
            console.error("Registration failed: User already exists");
            return res.status(409).json("Registration failed: User already exists"); 
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const insertQuery = "INSERT INTO user(`username`, `email`, `password`, `role`) VALUES (?)";
        const values = [[username, email, hashedPassword, role]];

        db.query(insertQuery, values, (err, data) => {
            if (err) {
                console.error("Error inserting user:", err);
                return res.status(500).json("Error inserting user: " + err.message);  
            }
            const userId = data.insertId;
            console.log("User created successfully with ID:", userId);
            return res.status(200).json({ message: "User has been created successfully.", userId });
        });
    });
};


// User login
export const login = (req, res) => {
    const { userID, password } = req.body;

    const q = "SELECT * FROM user WHERE userID = ?";
    db.query(q, [userID], (err, data) => {
        if (err) {
            console.error("Database query error during login:", err);
            return res.status(500).json("Internal server error: " + err.message);  
        }

        if (data.length === 0) {
            console.error("Login failed: User not found");
            return res.status(404).json("Login failed: User not found");  
        }

        const user = data[0];
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            console.error("Login failed: Incorrect password");
            return res.status(400).json("Login failed: Incorrect password");  
        }

        const token = jwt.sign({ id: user.userID, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("User logged in successfully:", user.userID);
        return res.status(200).json({ token, message: "Login successful!", role: user.role, userId: user.userID });
    });
};
