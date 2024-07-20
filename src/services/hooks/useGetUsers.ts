import { gql, useQuery } from "@apollo/client";
import { User } from "./useGetUser";

const GET_USERS = gql`
  query GetUsers {
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



interface UsersData {
  users: User[];
}

export const useGetUsers = () => {
  return useQuery<UsersData>(GET_USERS);
};
