import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import * as placesController from '../controllers/places.js';

const router = express.Router();

// Get all places
router.get('/', placesController.getAllPlaces);

// Get a single place
router.get('/:id', placesController.getPlace);

// Create a new place (user submission)
router.post('/', verifyToken, placesController.createPlace);

// Update a place
router.put('/:id', verifyToken, placesController.updatePlace);

// Delete a place
router.delete('/:id', verifyToken, placesController.deletePlace);

// Claim a place (for owners)
router.post('/:id/claim', verifyToken, placesController.claimPlace);

// Verify a place (for admins)
router.post('/:id/verify', verifyToken, placesController.verifyPlace);

// Search places
router.get('/search', placesController.searchPlaces);

export default router;