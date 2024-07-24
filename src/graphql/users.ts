import { graphql } from "relay-runtime";

export const usersQueryGraphQL = graphql`
  query usersQuery {
    users {
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
