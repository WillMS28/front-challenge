import { graphql } from "relay-runtime";

export const addFundsMutateGraphQL = graphql`
  mutation addFundsMutation($walletId: ID!, $amount: String!) {
    addFundsToWallet(walletId: $walletId, amount: $amount) {
      id
      balance
    }
  }
`;
