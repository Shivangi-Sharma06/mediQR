
export interface Medicine {
  id: string;
  name: string;
  batchNumber: string;
  expiryDate: Date;
  manufacturer: string;
  ipfsHash?: string;
  qrCode?: string;
  expired?: boolean;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  hash: string;
  status: 'success' | 'fail' | 'pending';
  message: string;
  timestamp: Date;
}

export interface WalletInfo {
  address: string;
  balance: string;
  isConnected: boolean;
}

export type UserRole = 'admin' | 'user';

export interface QRScanResult {
  isValid: boolean;
  medicine?: Medicine;
  status: 'valid' | 'expired' | 'invalid';
}

export interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
}
