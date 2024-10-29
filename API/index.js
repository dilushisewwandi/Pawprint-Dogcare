import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { db } from './Connect.js';
import userRoutes from "./routes/User.js";
import authRoutes from "./routes/Auth.js";
import distributorManageRoutes from "./routes/DistributorManage.js";
import adopterManageRoutes from "./routes/AdopterManage.js";
import daycareManageRoutes from "./routes/DaycareManage.js";
import vetManageRoutes from "./routes/VetManage.js";
import petManageRoutes from "./routes/PetManage.js";
import path from 'path';
import { fileURLToPath } from "url";
import distributorRoutes from "./routes/Distributor.js";
import petRoutes from "./routes/Pet.js";
import healthCardRoutes from "./routes/HealthCard.js";
import adopterRegiRoutes from "./routes/Adopter.js";
import VetRoutes from "./routes/Vet.js";
import daycareRoutes from "./routes/Daycare.js";
dotenv.config();

// Configure __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/distributorManage", distributorManageRoutes);
app.use("/api/adopter", adopterManageRoutes);
app.use("/api/adopterRegi", adopterRegiRoutes);
app.use("/api/daycareManage", daycareManageRoutes);
app.use("/api/petManage", petManageRoutes);
app.use("/api/vetManage", vetManageRoutes);
app.use("/api/vet", VetRoutes);
app.use("/api/distributor", distributorRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/daycare", daycareRoutes);
app.use("/api/healthcard", healthCardRoutes);



// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
