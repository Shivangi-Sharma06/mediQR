// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pinataSDK = require('@pinata/sdk');
require('dotenv').config(); // Loads variables from .env file

// Initialize Pinata SDK with API keys from environment variables
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

// Create an Express app
const app = express();

// Enable CORS for all routes (allows frontend to call backend)
app.use(cors());

// Parse incoming JSON requests (with large payloads, e.g., base64 images)
app.use(bodyParser.json({ limit: '10mb' }));

// POST endpoint to upload QR image to Pinata IPFS
app.post('/api/upload-ipfs', async (req, res) => {
  const { image } = req.body;

  // Check if image is provided
  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Convert base64 image string to buffer
  const matches = image.match(/^data:.+\/(.+);base64,(.*)$/);
  if (!matches) {
    return res.status(400).json({ error: 'Invalid image format' });
  }
  const buffer = Buffer.from(matches[2], 'base64');

  try {
    // Upload the buffer to Pinata IPFS
    const result = await pinata.pinFileToIPFS(buffer, {
      pinataMetadata: { name: 'medicine-qr' }
    });

    // Respond with the IPFS hash
    res.json({ ipfsHash: result.IpfsHash });
  } catch (e) {
    // Handle errors (e.g., Pinata API failure)
    res.status(500).json({ error: 'Upload failed', details: e.message });
  }
});

// Start the server on port 5000 (or from environment variable)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express backend running on port ${PORT}`));