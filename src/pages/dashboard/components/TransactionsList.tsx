import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";
import { useLazyLoadQuery } from "react-relay";
import { walletQueryGraphQL } from "@/graphql/wallet";
import { User } from "@/types/user";
import { walletQuery } from "@/graphql/__generated__/walletQuery.graphql";

interface TransactionsProps {
  user: User;
}

export const TransactionsList = ({ user }: TransactionsProps) => {
  const response = useLazyLoadQuery<walletQuery>(
    walletQueryGraphQL,
    { id: user.wallet.id },
    { fetchPolicy: "store-and-network" }
  );

  const sortedTransactions =
    response.wallet && Array.isArray(response.wallet.transactions)
      ? [...response.wallet.transactions].sort(
          (a, b) => parseInt(b.date) - parseInt(a.date)
        )
      : [];

  return (
    <div className="flex flex-col items-center w-1/2 max-md:w-full">
      <h3 className="text-lg font-semibold truncate text-white">
        My transactions
      </h3>

      <ScrollArea className="w-full p-2 flex flex-col max-h-[440px] overflow-y-auto">
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map((transaction) => {
            const isSended = transaction.fromWallet == user.wallet.id;
            const date = new Date(parseFloat(transaction.date));

            return (
              <div
                key={transaction.id}
                className="flex justify-between items-center max-sm:flex-col w-full border my-2 px-4 py-2 rounded-lg bg-secondary"
              >
                <div className="flex flex-col max-sm:items-center">
                  {isSended ? (
                    <span className="text-xs text-zinc-300">Transfer sent</span>
                  ) : (
                    <span className="text-xs text-zinc-300">
                      Transfer received
                    </span>
                  )}
                  <div className="flex flex-col items-start">
                    <p className="text-sm text-white font-semibold truncate ">
                      {isSended
                        ? transaction.receiver.name
                        : transaction.sender.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-baseline max-sm:flex-row max-sm:gap-2">
                  <div className="flex items-center justify-center gap-1 ">
                    <span className="text-sm text-white font-semibold truncate ">
                      {parseFloat(transaction.amount).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                    {isSended ? (
                      <ArrowBigUpDash className="text-white h-4 w-4" />
                    ) : (
                      <ArrowBigDownDash className="text-white h-4 w-4" />
                    )}
                  </div>
                  <div className="text-xs text-zinc-300">
                    <span>{date.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center w-full">
            <span className="text-white text-sm">No transactions found</span>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
