import { graphql } from "relay-runtime";

export const createUserMutationGraphQL = graphql`
  mutation createUserMutation($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
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
