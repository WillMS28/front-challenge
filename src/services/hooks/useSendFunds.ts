import { useMutation } from "react-relay";
import { sendFundsMutationGraphQL } from "@/graphql/sendFunds";
import { sendFundsMutation } from "@/graphql/__generated__/sendFundsMutation.graphql";

export const useSendFunds = () => {
  return useMutation<sendFundsMutation>(sendFundsMutationGraphQL);
};
