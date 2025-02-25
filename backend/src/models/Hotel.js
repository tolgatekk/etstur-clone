import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  amenities: [{
    type: String,
  }],
  rooms: [{
    type: String,
    required: true,
  }],
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Hotel', hotelSchema);
