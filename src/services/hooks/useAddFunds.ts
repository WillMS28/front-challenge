import { gql, useMutation } from "@apollo/client";

const ADD_FUNDS_TO_WALLET = gql`
  mutation AddFundsToWallet($walletId: ID!, $amount: String!) {
    addFundsToWallet(walletId: $walletId, amount: $amount) {
      id
      balance
    }
  }
`;

interface AddFundsToWalletData {
  addFundsToWallet: {
    id: string;
    balance: string;
  };
}

interface variablesAddFundsToWallet {
  walletId: string;
  amount: string;
}

export const useAddFunds = () => {
  return useMutation<AddFundsToWalletData, variablesAddFundsToWallet>(ADD_FUNDS_TO_WALLET);
};
