import express from 'express';
import { registerAdopter } from '../Controllers/Adopter.js'

const router = express.Router();

// Register route for adopter
router.post('/register', registerAdopter);

export default router;
