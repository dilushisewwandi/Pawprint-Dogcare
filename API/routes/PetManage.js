import express from 'express';
import { addPet, deletePet, updatePet, findAllPets, findByID, findPetByColor, findPetByBreed, findPetByAge, findPetByGender, findPetByDistributorID, findPetByAdoID, findPetByDcID } from '../Controllers/PetManage.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();

// Configure __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('petImage'), addPet);
router.delete('/delete/:id', deletePet);
router.put('/update/:id', upload.single('petImage'), updatePet);
router.get("/findAll", findAllPets);
router.get("/findById/:id", findByID);
router.get("/findByColor/:color", findPetByColor);
router.get("/findByBreed/:breed", findPetByBreed);
router.get("/findByAge/:age", findPetByAge);
router.get("/findByGender/:gender", findPetByGender);
router.get("/findByDisID/:disID", findPetByDistributorID);
router.get("/findByAdoID/:adoID", findPetByAdoID);
router.get("/findByDcID/:dcID", findPetByDcID);

export default router;
