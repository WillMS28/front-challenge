import { gql, useMutation } from "@apollo/client";
import { Wallet } from "./useGetUserWallet";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
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

interface CreateUserData {
  createUser: {
    id: string;
    name: string;
    email: string;
    wallet: Wallet;
  };
}

interface VariablesCreateUser {
  name: string;
  email: string;
}

export const useCreateUser = () => {
  return useMutation<CreateUserData, VariablesCreateUser>(CREATE_USER);
};
