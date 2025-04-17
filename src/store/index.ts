
import { create } from 'zustand';
import { Medicine, Transaction, WalletInfo, UserRole, AuthState } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Sample data
const sampleMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol',
    batchNumber: 'PARA2023001',
    expiryDate: new Date('2025-01-01'),
    manufacturer: 'PharmaCorp Ltd.',
    ipfsHash: 'QmZ7Ld9Aqrzjrv4PGR7Uym4iHMxHLMAUYJTqL8sdhVhUMa',
    qrCode: 'data:image/png;base64,iVBORw0KGgoA',
    expired: false,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Amoxicillin',
    batchNumber: 'AMOX2023001',
    expiryDate: new Date('2023-01-01'), // Expired
    manufacturer: 'MediPharm Inc.',
    ipfsHash: 'QmVrLdF9AqrzMrv4PGR7Uym4iHMxHLMAUYJTqL8sdhXYZb',
    qrCode: 'data:image/png;base64,jVBORw0KGgoA',
    expired: true,
    createdAt: new Date('2022-01-01'),
  },
  {
    id: '3',
    name: 'Ibuprofen',
    batchNumber: 'IBUP2023001',
    expiryDate: new Date('2024-06-01'),
    manufacturer: 'HealthPharm Ltd.',
    ipfsHash: 'QmZ7Ld9AqrzMpv4PGR7Uym4iHMxHLMAUYJTqL8sdhCDEf',
    qrCode: 'data:image/png;base64,iBORw0KGgoA',
    expired: false,
    createdAt: new Date('2023-02-01'),
  },
];

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1',
    status: 'success',
    message: 'Medicine QR code uploaded to IPFS',
    timestamp: new Date('2023-04-15'),
  },
  {
    id: '2',
    hash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
    status: 'fail',
    message: 'Transaction failed due to network error',
    timestamp: new Date('2023-04-14'),
  },
  {
    id: '3',
    hash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    status: 'success',
    message: 'Medicine registered on blockchain',
    timestamp: new Date('2023-04-13'),
  },
];

interface AppState {
  // Auth
  auth: AuthState;
  setRole: (role: UserRole | null) => void;
  login: (role: UserRole) => void;
  logout: () => void;
  
  // Wallet
  wallet: WalletInfo;
  connectWallet: () => void;
  disconnectWallet: () => void;
  
  // Medicines
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, 'id' | 'qrCode' | 'ipfsHash' | 'expired' | 'createdAt'>) => Promise<Medicine>;
  getMedicine: (batchNumber: string) => Medicine | undefined;
  tagAsExpired: (id: string) => void;
  searchMedicines: (query: string) => Medicine[];
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  
  // QR Code
  generateQRCode: (medicine: Medicine) => Promise<string>;
  uploadToIPFS: (qrCode: string, medicine: Medicine) => Promise<string>;
  scanQR: (qrCode: string) => Promise<Medicine | null>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Auth state
  auth: {
    isAuthenticated: false,
    role: null,
  },
  setRole: (role) => set((state) => ({ auth: { ...state.auth, role } })),
  login: (role) => set({ auth: { isAuthenticated: true, role } }),
  logout: () => set({ auth: { isAuthenticated: false, role: null } }),
  
  // Wallet state
  wallet: {
    address: '',
    balance: '0',
    isConnected: false,
  },
  connectWallet: async () => {
    // Simulate connecting to wallet
    setTimeout(() => {
      set({
        wallet: {
          address: '0x4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c',
          balance: '1.25',
          isConnected: true,
        },
      });
      // Add a success transaction
      get().addTransaction({
        hash: '0x' + Math.random().toString(16).substring(2, 50),
        status: 'success',
        message: 'Wallet connected successfully',
      });
    }, 1000);
  },
  disconnectWallet: () => set({
    wallet: {
      address: '',
      balance: '0',
      isConnected: false,
    },
  }),
  
  // Medicines state
  medicines: [...sampleMedicines],
  addMedicine: async (medicineData) => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        const newMedicine: Medicine = {
          id: uuidv4(),
          ...medicineData,
          expired: false,
          createdAt: new Date(),
        };
        
        set((state) => ({
          medicines: [...state.medicines, newMedicine],
        }));

        // Generate QR code
        get().generateQRCode(newMedicine).then((qrCode) => {
          const updatedMedicine = { ...newMedicine, qrCode };
          
          // Upload to IPFS
          get().uploadToIPFS(qrCode, updatedMedicine).then((ipfsHash) => {
            const finalMedicine = { ...updatedMedicine, ipfsHash };
            
            // Update the medicine in store with QR and IPFS
            set((state) => ({
              medicines: state.medicines.map(
                (med) => med.id === newMedicine.id ? finalMedicine : med
              ),
            }));
            
            resolve(finalMedicine);
          });
        });
      }, 1500);
    });
  },
  getMedicine: (batchNumber) => {
    return get().medicines.find((m) => m.batchNumber === batchNumber);
  },
  tagAsExpired: (id) => {
    set((state) => ({
      medicines: state.medicines.map(
        (medicine) => medicine.id === id 
          ? { ...medicine, expired: true } 
          : medicine
      ),
    }));
    
    // Add a transaction
    get().addTransaction({
      hash: '0x' + Math.random().toString(16).substring(2, 50),
      status: 'success',
      message: 'Medicine tagged as expired',
    });
  },
  searchMedicines: (query) => {
    const { medicines } = get();
    if (!query) return medicines;
    const lowerQuery = query.toLowerCase();
    
    return medicines.filter(
      (medicine) => 
        medicine.name.toLowerCase().includes(lowerQuery) ||
        medicine.batchNumber.toLowerCase().includes(lowerQuery) ||
        medicine.manufacturer.toLowerCase().includes(lowerQuery) ||
        (medicine.ipfsHash && medicine.ipfsHash.toLowerCase().includes(lowerQuery))
    );
  },
  
  // Transactions state
  transactions: [...sampleTransactions],
  addTransaction: (transactionData) => {
    const newTransaction: Transaction = {
      id: uuidv4(),
      ...transactionData,
      timestamp: new Date(),
    };
    
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
  },
  
  // QR Code methods
  generateQRCode: async (medicine) => {
    return new Promise((resolve) => {
      // Simulate generating QR code
      setTimeout(() => {
        // In reality, you would generate a QR code based on the medicine data
        const qrCode = `data:image/png;base64,${medicine.id}${Date.now()}`;
        resolve(qrCode);
        
        // Add a transaction
        get().addTransaction({
          hash: '0x' + Math.random().toString(16).substring(2, 50),
          status: 'success',
          message: 'QR code generated for ' + medicine.name,
        });
      }, 1000);
    });
  },
  uploadToIPFS: async (qrCode, medicine) => {
    return new Promise((resolve) => {
      // Simulate uploading to IPFS
      setTimeout(() => {
        // Generate a fake IPFS hash
        const ipfsHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        resolve(ipfsHash);
        
        // Add a transaction
        get().addTransaction({
          hash: '0x' + Math.random().toString(16).substring(2, 50),
          status: 'success',
          message: 'QR code uploaded to IPFS for ' + medicine.name,
        });
      }, 1500);
    });
  },
  scanQR: async (qrCode) => {
    return new Promise((resolve) => {
      // Simulate scanning QR code
      setTimeout(() => {
        // Here we would validate the QR code and fetch the medicine
        // For now just return a random medicine
        const medicines = get().medicines;
        if (medicines.length === 0) {
          resolve(null);
          return;
        }
        
        const randomIndex = Math.floor(Math.random() * medicines.length);
        resolve(medicines[randomIndex]);
        
        // Add a transaction
        get().addTransaction({
          hash: '0x' + Math.random().toString(16).substring(2, 50),
          status: 'success',
          message: 'QR code scanned successfully',
        });
      }, 1000);
    });
  },
}));
