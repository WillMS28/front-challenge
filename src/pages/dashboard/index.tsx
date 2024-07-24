import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuery } from "relay-runtime";
import { useRelayEnvironment } from "react-relay";

import { Separator } from "@/components/ui/separator";
import { UserListToTransfer } from "./components/usersListToTransfer";

import { TransactionsList } from "./components/TransactionsList";
import { Wallet } from "./components/wallet";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import { User } from "@/types/user";

import { userQueryGraphQL } from "@/graphql/user";
import { walletQueryGraphQL } from "@/graphql/wallet";
import { userQuery } from "@/graphql/__generated__/userQuery.graphql";
import { walletQuery } from "@/graphql/__generated__/walletQuery.graphql";

export const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const environment = useRelayEnvironment();

  const navigate = useNavigate();
  const location = useLocation();

  const closeAndBackToLogin = () => {
    localStorage.removeItem("user");
    setUser(null);

    navigate("/");
  };

  const getUserRelay = async (
    environment: RelayModernEnvironment,
    id: string
  ) => {
    try {
      await fetchQuery<userQuery>(environment, userQueryGraphQL, {
        id: id,
      })
        .toPromise()
        .then((res) => {
          setUser(res.user);
        });
    } catch (error) {
      console.error("Failed to refresh transactions:", error);
    }
  };

  getUserRelay(environment, user?.id ? user?.id : "");

  const refetchQueries = () => {
    handleRefreshClick();
  };

  useEffect(() => {
    if (location.state.id) {
      setUser(location.state);
    }
  }, [location.state]);

  const handleRefreshClick = async () => {
    if (user) {
      try {
        await fetchQuery<walletQuery>(environment, walletQueryGraphQL, {
          id: user.wallet.id,
        }).toPromise();
      } catch (error) {
        console.error("Failed to refresh transactions:", error);
      }
    }
  };

  return (
    <div className="flex flex-col relative w-[90%] h-[90%] max-md:min-h-[80%] max-md:h-auto max-w-[1280px] space-y-6 shadow-lg bg-primary bg-opacity-80 rounded-lg backdrop-blur-sm p-6">
      <Wallet
        closeAndBackToLogin={closeAndBackToLogin}
        refetchQueries={refetchQueries}
        user={user}
      />

      <Separator />

      <div className="flex justify-between h-full max-md:flex-col gap-4">
        {user ? <TransactionsList user={user} /> : <></>}
        <Separator orientation="vertical" />

        <div className=" flex flex-col items-center w-1/2 max-md:w-full">
          <h3 className="text-lg font-semibold truncate text-white">
            Transfer to:
          </h3>
          {/* lista restante dos usuários */}
          {user && (
            <UserListToTransfer myUser={user} refetch={refetchQueries} />
          )}
        </div>
      </div>
    </div>
  );
};
