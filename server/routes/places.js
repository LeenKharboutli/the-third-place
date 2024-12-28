import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getAllPlaces, getPlace, createPlace, updatePlace, deletePlace, claimPlace, verifyPlace, searchPlaces } from '../controllers/places.js';

const router = express.Router();


// Get all places
router.get('/', getAllPlaces);

// Get a single place
router.get('/:id', getPlace);

// Create a new place (user submission)
router.post('/', verifyToken, createPlace);

// Update a place
router.put('/:id', verifyToken, updatePlace);

// Delete a place
router.delete('/:id', verifyToken, deletePlace);

// Claim a place (for owners)
router.post('/:id/claim', verifyToken, claimPlace);

// Verify a place (for admins)
router.post('/:id/verify', verifyToken, verifyPlace);

// Search places
router.get('/search', searchPlaces);

export default router;



