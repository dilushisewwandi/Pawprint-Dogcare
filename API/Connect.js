// import mysql from "mysql";

// // Create and export the connection
// export const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "", 
//     database: "pawprints",
//     port: 3306
// });

// // Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error("Database connection failed: ", err);
//         return;
//     }
//     console.log("Connected to database.");
// });

import mysql from "mysql";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create and export the connection
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to database.");
});
