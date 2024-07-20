import { gql, useQuery } from "@apollo/client";

export const GET_WALLET = gql`
  query GetWallet($id: ID!) {
    wallet(id: $id) {
      id
      balance
      transactions {
        id
        fromWallet
        toWallet
        amount
        date
        sender {
          id
          name
        }
        receiver {
          id
          name
        }
      }
    }
  }
`;

export interface Transaction {
  id: string;
  fromWallet: string;
  toWallet: string;
  amount: number;
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

export interface Wallet {
  id: string;
  balance: number;
  transactions: Transaction[];
}

export interface WalletData {
  wallet: Wallet;
}


export const useGetUserWallet = (id: string) => {
  return  useQuery<WalletData>(GET_WALLET, {
    variables: { id },
  })
};
