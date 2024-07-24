import { graphql } from "relay-runtime";

export const walletQueryGraphQL = graphql`
  query walletQuery($id: ID!) {
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
