import { GET_USER, UserData, VariablesUser } from "@/services/hooks/useGetUser";
import { User } from "@/services/hooks/useGetUsers";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

interface WalletBalanceProps {
  user: User;
}

export const WalletBalance = ({ user }: WalletBalanceProps) => {
  const [balance, setBalance] = useState(0);

  const { loading: getUserLoading, data: getUserData } = useQuery<
    UserData,
    VariablesUser
  >(GET_USER, {
    variables: { id: user?.id ? user?.id : "" },
  });
  useEffect(() => {
    if (getUserData) {
      setBalance(getUserData.user.wallet.balance);
    }
  }, [getUserData]);

  return (
    <div className="flex flex-col">
      <span className="text-zinc-600 text-sm">Balance</span>
      <span className="text-zinc-600 text-base font-semibold">
        {balance.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    </div>
  );
};
