import { useMutation } from "react-relay";
import { addFundsMutateGraphQL } from "@/graphql/addFunds";
import { addFundsMutation } from "@/graphql/__generated__/addFundsMutation.graphql";

export const useAddFunds = () => {
  return useMutation<addFundsMutation>(addFundsMutateGraphQL);
};
