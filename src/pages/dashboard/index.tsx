import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "@/services/hooks/useGetUser";
import { UserList } from "./users-list";
import { useAddFunds } from "@/services/hooks/useAddFunds";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { WalletBalance } from "@/components/walletBalance";
import { GET_USER, UserData, VariablesUser } from "@/services/hooks/useGetUser";
import { useQuery } from "@apollo/client";
import {
  GET_WALLET,
  useGetUserWallet,
  WalletData,
} from "@/services/hooks/useGetUserWallet";
import { TransactionsList } from "./Transactions-list";
import { LogOut } from "lucide-react";

export const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [walletDetails, setWalletDetails] = useState<WalletData | null>(null);
  const [openPopover, setOpenPopover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [addFunds, { loading: addFoundsLoading }] = useAddFunds();
  const [amount, setAmount] = useState(0);

  const {
    data: getWalletData,
    loading: getWalletLoading,
    called: calledWallet,
    client: clientWallet,
  } = useGetUserWallet(
    user?.wallet.id ? user?.wallet.id : location.state.wallet.id
  );

  const {
    loading: getUserLoading,
    data: getUserData,
    called: getUserCalled,
    client,
  } = useQuery<UserData, VariablesUser>(GET_USER, {
    variables: { id: user?.id ? user.id : location.state.id },
  });

  function handleAddFunds(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setOpenPopover(false);
    const target = event.target as typeof event.target & {
      amount: { value: string };
    };
    addFunds({
      variables: {
        amount: parseFloat(target.amount.value),
        walletId: user?.wallet.id ? user?.wallet.id : location.state.wallet.id,
      },
    });

    refetchQueries();
  }

  const closeAndBackToLogin = () => {
    localStorage.removeItem("user");
    setUser(null);
    setWalletDetails(null);

    navigate("/");
  };

  const refetchQueries = () => {
    client.refetchQueries({
      include: [GET_USER],
    });
    clientWallet.refetchQueries({
      include: [GET_WALLET],
    });
  };

  useEffect(() => {
    if (getWalletData && !getWalletLoading) {
      setWalletDetails(getWalletData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calledWallet, getWalletLoading]);

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

  if (user && walletDetails) {
    return (
      <div className="flex flex-col relative w-[90%] h-[90%] max-md:min-h-[80%] max-md:h-auto max-w-[1280px] space-y-6 shadow-lg bg-primary bg-opacity-80 rounded-lg backdrop-blur-sm p-6">
        <div className="w-full flex justify-between max-md:flex-col gap-4">
          <div className="">
            <Button
              onClick={closeAndBackToLogin}
              className="absolute right-2 top-2
           rounded-full  bg-zinc-200 cursor-pointer m-0 shadow-md hover:bg-zinc-300 hover:text-white"
            >
              <LogOut className="font-bold truncate text-zinc-600 w-4 h-4 " />
            </Button>
          </div>

          <div className="flex justify-center items-center">
            <h2 className="text-2xl font-bold truncate text-white">
              Challenge{" "}
            </h2>
            <h2 className="text-2xl font-bold truncate text-secondary">
              Fullstack
            </h2>
          </div>

          <div className="">
            <Card className="h-[160px] min-w-[260px] flex flex-col justify-between ">
              <CardHeader>
                <CardTitle className="text-lg truncate text-zinc-600">
                  {user?.name}
                </CardTitle>
                <CardDescription>My wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex justify-between items-center gap-2 space-y-1.5">
                    {user ? <WalletBalance user={user} /> : <></>}

                    <Popover onOpenChange={setOpenPopover} open={openPopover}>
                      <PopoverTrigger asChild>
                        <Button
                          className="bg-secondary hover:bg-secondary-hover"
                          onClick={() => setOpenPopover(true)}
                        >
                          Add funds
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                              Add Funds
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              how much do you want to add to your wallet
                            </p>
                          </div>
                          <form onSubmit={handleAddFunds}>
                            <div className="grid gap-4">
                              <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="width">Amount</Label>
                                <Input
                                  id="amount"
                                  name="amount"
                                  value={amount}
                                  onChange={(e) =>
                                    setAmount(parseFloat(e.target.value))
                                  }
                                  className="col-span-2 h-8"
                                />
                              </div>

                              <Button
                                type="submit"
                                disabled={amount <= 0 || addFoundsLoading}
                                className="bg-secondary hover:bg-secondary-hover"
                              >
                                Add Funds
                              </Button>
                            </div>
                          </form>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Separator />

        <div className="flex justify-between h-full max-md:flex-col gap-4">
          <TransactionsList user={user} walletDetails={walletDetails} />
          <Separator orientation="vertical" />

          <div className=" flex flex-col items-center w-1/2 max-md:w-full">
            <h3 className="text-lg font-semibold truncate text-white">
              Transfer to:
            </h3>
            {/* lista restante dos usuários */}
            <UserList myUser={user} refetch={refetchQueries} />
          </div>
        </div>
      </div>
    );
  }
};
