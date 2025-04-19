# 🛡️💊 Blockchain-Based Medicine Authenticity Checker 💊🛡️

------



## 🚨 Problem 🚨

- **Risk of Fake Medicines**: Fake medicines pose serious health risks and can undermine treatments.
- **Targeted Expensive Medicines**: High-cost and rare medicines are often substituted or counterfeited.
- **Lack of Verification**: There's insufficient oversight to confirm the authenticity of such medicines.
- **Ensuring Authenticity**: Medicines from trusted producers should be checked for tampering during transit.
- **Seal Checking Limitations**: Checking the seal is a common method, but seals can be easily tampered with, demanding more robust safeguards.

---

## ✅ Solution ✅

- **Unique QR Code for Medicines**: 
  - Each batch of medicine will have a unique QR code.
  - The QR code will include details such as the manufacturer's crypto wallet address, the medicine name, and the batch number.

- **Blockchain Integration**: 
  - The QR code data will be securely stored on the InterPlanetary File System (IPFS) using blockchain technology, ensuring immutability and authenticity.

- **Supply Chain Tracking**: 
  - A supply chain system will track the movement of medicines, allowing visibility of their journey from manufacturing to delivery.
  - This ensures that the origin and transit of the medicine can be easily identified.

- **Verification by Users**: 
  - When a user scans the QR code, they can immediately verify its authenticity through the embedded data.
  - This process will help determine if the medicine is genuine or counterfeit.

---

## ✨ Features ✨

**1. 🏢 Admin Panel (Pharma Company) 🏢**
- 📝 Medicine entry form (name, batch, expiry).
- ➕ Generate QR code with a download option.
- ⬇️ A button to upload the QR code to IPFS like pinata.
- 📊 View all updated records.
The admin dashboard will also reflect the IPFS hash of the QR code along with the date and time. The notifications will also be available to know if the particular transaction was successful or not.

**2. 🏥 User Interface (Pharmacist/Store) 🏥**
- 📷 Scan QR code.
- ℹ️ Fetch and display details.
- ✅/❌ Display: Genuine/Not Genuine

**3. 🔗 Blockchain Integration 🔗**
- 🚫 Prevents off-chain tampering

---

## 📊 Market Research 📊

1. 💊The Indian drug market has the valuation of more than 200 Billion Rupees.
2. 🌍 1 in 10 medicines in developing countries are substandard
3. 📈 Extensive Pharma Demand


---

## 🚧 Currently In Development Phase
The following features have been added-:
- function to connect crytpo wallet of the manufacturer.
- a unique QR code is being generated which reflects the metadata when scanned.
- The function to scan QR code in the users dashboard and to see the scanned QR code to check its authenticity.

The following features are yet to be implemented -:
- the storage on IPFS.
- the functioning of supply chain model.
- the storage of from data on manufacturer for later access.
- authentication system for the admin to facilitate login and logout features.

---


## 🛠️ Tech Stack 🛠️

- Front-end: ReactJS/Vite 🖼️
- Back-end: NodeJS/FastAPI ⚙️
- Database: Firebase/MongoDB 🗄️
- QR code: qrcode npm package 🔳
- IPFS: Pinata ☁️
- Blockchain: Solidity, Ethers.js, Hardhat, ERC1155 contract 🔗
