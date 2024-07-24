export interface Wallet {
    id: string;
    balance: string;
    transactions: Transaction[];
  }
  
  export interface WalletData {
    wallet: Wallet;
  }

  export interface Transaction {
    id: string;
    fromWallet: string;
    toWallet: string;
    amount: string;
    date: string;
    sender: {
      id: string;
      name: string;
    };
    receiver: {
      id: string;
      name: string;
    };
  }
  
  