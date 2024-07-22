import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { User } from "@/services/hooks/useGetUser";
import { UserList } from "./components/users-list";
import { GET_USER, UserData, VariablesUser } from "@/services/hooks/useGetUser";
import { useQuery } from "@apollo/client";
import {
  GET_WALLET,
  useGetUserWallet,
  WalletData,
} from "@/services/hooks/useGetUserWallet";
import { TransactionsList } from "./components/Transactions-list";
import { Wallet } from "./components/wallet";

export const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [walletDetailsT, setWalletDetailsTransfer] = useState<
    WalletData | undefined
  >();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: getWalletData,
    loading: getWalletLoading,
    client: clientWallet,
  } = useGetUserWallet(
    location.state.wallet.id ? location.state.wallet.id : user?.wallet.id
  );

  const {
    loading: getUserLoading,
    data: getUserData,
    called: getUserCalled,
    client,
  } = useQuery<UserData, VariablesUser>(GET_USER, {
    variables: { id: location.state.id ? location.state.id : user?.id },
  });

  const closeAndBackToLogin = () => {
    localStorage.removeItem("user");
    setUser(null);
    setWalletDetailsTransfer(undefined);

    navigate("/");
  };

  const refetchQueries = async () => {
    await client.refetchQueries({
      include: [GET_USER],
    });
    const newTransaction = await clientWallet.refetchQueries({
      include: [GET_WALLET],
    });
    if (newTransaction[0]?.data) {
      setWalletDetailsTransfer(() => newTransaction[0].data);
    }
  };

  useEffect(() => {
    if (getUserData && !getUserLoading) {
      setUser(getUserData.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserCalled]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (getUserData?.user) {
        localStorage.setItem("user", JSON.stringify(getUserData?.user));
        setUser(getUserData?.user);
      }
    } else if (!storedUser || !JSON.parse(storedUser).id) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getUserData && !getUserLoading) {
      setUser(getUserData.user);
    }
  }, [getUserData, getUserLoading]);

  /*  useEffect(() => {
    if (getWalletData) {
      setWalletDetails((currentWalletData) => {
        if (currentWalletData) {
          if (
            currentWalletData?.wallet.transactions.length >=
            getWalletData?.wallet.transactions.length
          )
            return currentWalletData;
        } else {
          return getWalletData;
        }
      });
    }
  }, [getWalletData, walletDetails?.wallet.transactions.length, getWalletLoading, calledWallet]);*/

  const walletDetails = useMemo((): WalletData | null | undefined => {
    if (getWalletData) {
      console.log("walletDetails");
      if (walletDetailsT) {
        if (
          walletDetailsT.wallet.transactions.length >
          getWalletData.wallet.transactions.length
        ) {
          return walletDetailsT;
        } else {
          return getWalletData;
        }
      }
      return getWalletData;
    } else if (walletDetailsT && !getWalletData) {
      return walletDetailsT;
    } else {
      return null;
    }
  }, [getWalletData, walletDetailsT, getWalletLoading]);

  return (
    <div className="flex flex-col relative w-[90%] h-[90%] max-md:min-h-[80%] max-md:h-auto max-w-[1280px] space-y-6 shadow-lg bg-primary bg-opacity-80 rounded-lg backdrop-blur-sm p-6">
      <Wallet
        closeAndBackToLogin={closeAndBackToLogin}
        refetchQueries={refetchQueries}
        user={user}
      />

      <Separator />

      <div className="flex justify-between h-full max-md:flex-col gap-4">
        {user && walletDetails ? (
          <TransactionsList user={user} walletDetails={walletDetails} />
        ) : (
          <></>
        )}
        <Separator orientation="vertical" />

        <div className=" flex flex-col items-center w-1/2 max-md:w-full">
          <h3 className="text-lg font-semibold truncate text-white">
            Transfer to:
          </h3>
          {/* lista restante dos usuários */}
          {user && <UserList myUser={user} refetch={refetchQueries} />}
        </div>
      </div>
    </div>
  );
};
