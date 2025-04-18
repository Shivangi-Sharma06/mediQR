const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');

const pinata = pinataSDK('f03bb24ce5f44cbdad52', '32d3d425c25ff56e019a0d755cf99fe16cbc46093e8b68c3ead9d6af0e364b9f');

// Replace this with the path to your QR code image
const qrCodePath = path.join(__dirname, 'qr_code.png');

const readableStreamForFile = fs.createReadStream(qrCodePath);

pinata.pinFileToIPFS(readableStreamForFile).then((result) => {
    console.log('File uploaded to IPFS:', result);
    // You can access the IPFS link here
}).catch((err) => {
    console.log('Error uploading file to IPFS:', err);
});


