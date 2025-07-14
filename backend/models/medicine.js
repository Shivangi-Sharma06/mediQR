const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define Medicine schema and model
const medicineSchema = new mongoose.Schema({
  name: String,
  batchNumber: String,
  manufacturerAddress: String,
  expiryDate: String,
  ipfsHash: String,
  createdAt: { type: Date, default: Date.now }
});
const Medicine = mongoose.model('Medicine', medicineSchema);

// Initialize Pinata SDK
const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// POST endpoint to upload QR image to Pinata IPFS and save to MongoDB
app.post('/api/upload-ipfs', async (req, res) => {
  const { image, name, batchNumber, manufacturerAddress, expiryDate } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const matches = image.match(/^data:.+\/(.+);base64,(.*)$/);
  if (!matches) {
    return res.status(400).json({ error: 'Invalid image format' });
  }

  const buffer = Buffer.from(matches[2], 'base64');
  const stream = Readable.from(buffer);

  try {
    const result = await pinata.pinFileToIPFS(stream, {
      pinataMetadata: { name: 'medicine-qr' }
    });

    // Save medicine details to MongoDB
    const medicine = new Medicine({
      name,
      batchNumber,
      manufacturerAddress,
      expiryDate,
      ipfsHash: result.IpfsHash
    });
    await medicine.save();

    res.json({ ipfsHash: result.IpfsHash });
  } catch (e) {
    console.error('Error uploading to Pinata or saving to MongoDB:', e);
    res.status(500).json({ error: 'Upload failed', details: e.message });
  }
});

// (Optional) GET endpoint to fetch all medicines
app.get('/api/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });
    res.json(medicines);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch medicines', details: e.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Express backend running at http://localhost:${PORT}`)
);