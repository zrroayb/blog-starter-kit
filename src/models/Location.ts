import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  ilce: String,
  mahalle: String,
  nufus: Number,
  yuzolcumu: String,
  photo: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Location || mongoose.model('Location', LocationSchema); 