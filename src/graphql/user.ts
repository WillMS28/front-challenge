import { graphql } from "relay-runtime";

export const userQueryGraphQL = graphql`
  query userQuery($id: ID!) {
    user(id: $id) {
      id
      name
      email
      wallet {
        id
        balance
      }
    }
  }
`;
