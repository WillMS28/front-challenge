import { graphql } from "relay-runtime";

export const sendFundsMutationGraphQL = graphql`
  mutation sendFundsMutation(
    $fromWalletId: ID!
    $toWalletId: ID!
    $amount: String!
  ) {
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
