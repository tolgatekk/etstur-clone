import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Create hotel
router.post('/', async (req, res) => {
  const hotel = new Hotel({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    city: req.body.city,
    images: req.body.images,
    rating: req.body.rating,
    price: req.body.price,
    amenities: req.body.amenities,
    rooms: req.body.rooms,
  });

  try {
    const newHotel = await hotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search hotels
router.get('/search', async (req, res) => {
  try {
    const { location, checkIn, checkOut, guests } = req.query;
    
    const query = {};
    if (location) {
      query.$or = [
        { location: { $regex: location, $options: 'i' } },
        { city: { $regex: location, $options: 'i' } },
      ];
    }

    const hotels = await Hotel.find(query);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/search/by-name', async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ message: "Name parameter is required" });
    }

    const hotels = await Hotel.find({ name: { $regex: name, $options: 'i' } }); // 'i' ile büyük/küçük harf duyarsız arama
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
