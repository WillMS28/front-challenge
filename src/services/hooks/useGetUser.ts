import { gql, useQuery } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($id: ID!) {
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

export interface User {
  id: string;
  name: string;
  email: string;
  wallet: {
    id: string;
    balance: number;
  };
}
export interface UserData {
  user: User;
}

export interface VariablesUser {
  id: string;
}

export const useGetUser = (id: string) => {

  return useQuery<UserData>(GET_USER, {
    variables: { id },
  });
};
