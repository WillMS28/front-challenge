import { gql, useMutation } from "@apollo/client";

const ADD_FUNDS_TO_WALLET = gql`
  mutation AddFundsToWallet($walletId: ID!, $amount: Float!) {
    addFundsToWallet(walletId: $walletId, amount: $amount) {
      id
      balance
    }
  }
`;

interface AddFundsToWalletData {
  addFundsToWallet: {
    id: string;
    balance: number;
  };
}

interface variablesAddFundsToWallet {
  walletId: string;
  amount: number;
}

export const useAddFunds = () => {
  return useMutation<AddFundsToWalletData, variablesAddFundsToWallet>(ADD_FUNDS_TO_WALLET);
};
