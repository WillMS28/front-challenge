import { useMutation } from "react-relay";
import { Wallet } from "@/types/wallet";
import { createUserMutation } from "@/graphql/__generated__/createUserMutation.graphql";
import { createUserMutationGraphQL } from "@/graphql/createUser";

export interface CreateUserData {
  createUser: {
    id: string;
    name: string;
    email: string;
    wallet: Wallet;
  };
}

export const useCreateUser = () => {
  return useMutation<createUserMutation>(createUserMutationGraphQL);
};
