import { userQueryGraphQL } from "@/graphql/user";
import { RelayEnvironment } from "@/RelayEnvironment";
import { User, UserData } from "@/types/user";
import { Loader2 } from "lucide-react";
import { QueryRenderer } from "react-relay";

interface WalletBalanceProps {
  user: User;
}


export const WalletBalance = ({ user }: WalletBalanceProps) => {
  return (
    <QueryRenderer
      variables={{ id: user.id }}
      environment={RelayEnvironment}
      query={userQueryGraphQL}
      render={({ error, props }) => {
        if (error) {
          return <div>Error! {error.message}</div>;
        } else if (!props) {
          return (
            <div className="flex justify-center items-center">
              <Loader2 className="mr-2 h-8 w-8 animate-spin text-secondary" />
            </div>
          );
        } else {
          const usersData = props as UserData;

          if (usersData.user.wallet.balance) {
            return (
              <div className="flex flex-col">
                <span className="text-zinc-600 text-sm">Balance</span>
                <span className="text-zinc-600 text-base font-semibold">
                  {parseFloat(usersData.user.wallet.balance).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            );
          }
        }
      }}
    />
  );
};
