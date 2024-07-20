import { gql, useMutation } from "@apollo/client";

const SEND_FUNDS = gql`
  mutation SendFunds($fromWalletId: ID!, $toWalletId: ID!, $amount: Float!) {
    sendFunds(
      fromWalletId: $fromWalletId
      toWalletId: $toWalletId
      amount: $amount
    ) {
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
`;

interface SendFundsData {
  sendFunds: {
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
  };
}

interface SendFundsVars {
  fromWalletId: string;
  toWalletId: string;
  amount: number;
}

export const useSendFunds = () => {
  return useMutation<SendFundsData, SendFundsVars>(SEND_FUNDS);
};
