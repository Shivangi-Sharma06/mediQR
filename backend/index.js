const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');
require('dotenv').config(); 

// Initialize Pinata SDK
const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// POST endpoint to upload QR image to Pinata IPFS
app.post('/api/upload-ipfs', async (req, res) => {
  const { image } = req.body;

  // Validate
  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Extract base64 data
  const matches = image.match(/^data:.+\/(.+);base64,(.*)$/);
  if (!matches) {
    return res.status(400).json({ error: 'Invalid image format' });
  }

  const buffer = Buffer.from(matches[2], 'base64');

  // Convert buffer to stream
  const stream = Readable.from(buffer);

  try {
    const result = await pinata.pinFileToIPFS(stream, {
      pinataMetadata: { name: 'medicine-qr' }
    });

    res.json({ ipfsHash: result.IpfsHash });
  } catch (e) {
    console.error('Error uploading to Pinata:', e);
    res.status(500).json({ error: 'Upload failed', details: e.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Express backend running at http://localhost:${PORT}`)
);


