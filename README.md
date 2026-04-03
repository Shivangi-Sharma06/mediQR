
💊 **mediQR** 

 **Blockchain Medicine Authenticity Checker**

Hey! 👋

mediQR is an innovative platform that protects consumers from counterfeit medicines by using blockchain + IPFS + QR codes to ensure each medicine lot is genuine.

# 🚀 Features

✅ Generates a unique QR code for every batch of medicine

✅ Stores QR details securely on IPFS (via Pinata)

✅ Connects with MetaMask to link manufacturer wallets

✅ Allows consumers to scan & verify medicine authenticity

✅ Data securely stored in MongoDB Atlas


# 🏗️ Tech Stack

⚙️ Backend: Node.js + Express.js 

🌐 Frontend: React + Vite

🗄️ Database: MongoDB Atlas

🔗 IPFS: Pinata Cloud

🦊 Wallet: MetaMask


# 📌 How It Works

1️⃣ Manufacturer logs in and connects their MetaMask wallet

2️⃣ Fills out the medicine form (name, expiry, batch)

3️⃣ Platform generates a unique QR code for that batch

4️⃣ QR is uploaded to IPFS, hash stored in DB

5️⃣ Consumer scans the QR → verifies name, expiry, wallet & hash — ensuring the medicine is real!


# 🗂️ Some Insights

- A limited number of medicines can only be generated once per a lot.
 
- The manufacturer's wallet address is pre-filled in medicine form which cannot be altered.

- The QR code generated when scanned will depict the manufacturer address, the batch number and the expiry which will account for the medicine to be true.


# 🏁 Getting Started

**1️⃣ Install dependencies** 
npm install

**2️⃣ Run the backend server**
cd backend
npm install
npm run dev

**3️⃣ Run the frontend dev server**
npm run dev

**⚙️ Environment Variables**
Create a .env in your backend/ folder:

PINATA_API_KEY=YOUR_PINATA_API_KEY

PINATA_SECRET_API_KEY=YOUR_PINATA_SECRET_API_KEY

MONGO_URI=YOUR_MONGO_DB_URI

PORT=5000

# ✨ Status

🚧 Project under active development.
Authentication & extra enhancements coming soon! 🔒

 # Conclusion  
❤️ Built to make medicines safer, lives healthier & fakes irrelevant!

Let’s fight counterfeit together! 🚀

~ Shivangi Sharma and Manvi Maheshwari🫶
