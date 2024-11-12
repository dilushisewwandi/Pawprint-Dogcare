import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import { registerPet, getPetsByDistributor, getAllPets, getPetProfile, getAllPetProfiles, registerAdopterAndAdoptPet, getAdoptionRequestsByDistributor } from '../Controllers/Pet.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/register', upload.single('petImage'), registerPet);
router.get('/distributor/:disID', getPetsByDistributor);
router.get('/allpets', getAllPets);
router.get('/petProfile/:petID', getPetProfile);
router.get('/petProfiles', getAllPetProfiles);
router.post('/adopt/:petID', registerAdopterAndAdoptPet);
router.get('/adoptionRequest/:userID',getAdoptionRequestsByDistributor)

export default router;
