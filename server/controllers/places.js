import Place from '../models/Place.js';

export const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlace = async (req, res) => {
  const place = new Place({
    ...req.body,
    submittedBy: req.user.id
  });

  try {
    const newPlace = await place.save();
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlace) return res.status(404).json({ message: 'Place not found' });
    res.json(updatedPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const claimPlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    if (place.owner) return res.status(400).json({ message: 'Place already claimed' });

    place.owner = req.user.id;
    await place.save();
    res.json({ message: 'Place claimed successfully', place });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });

    place.isVerified = true;
    await place.save();
    res.json({ message: 'Place verified successfully', place });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchPlaces = async (req, res) => {
  try {
    const { query } = req.query;
    const places = await Place.find({ 
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TODO: Implement Google Places API integration for fetching and creating places