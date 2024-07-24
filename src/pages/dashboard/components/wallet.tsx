import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addFundsMutation$data } from "@/graphql/__generated__/addFundsMutation.graphql";
import { WalletBalance } from "@/pages/dashboard/components/walletBalance";
import { useAddFunds } from "@/services/hooks/useAddFunds";
import { User } from "@/types/user";
import { LogOut } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";

interface WalletProps {
  closeAndBackToLogin: () => void;
  user: User | null;
  refetchQueries: () => void;
}

export const Wallet = ({
  closeAndBackToLogin,
  user,
  refetchQueries,
}: WalletProps) => {
  const [amount, setAmount] = useState("0");
  const [openPopover, setOpenPopover] = useState(false);
  const location = useLocation();

  const [, setData] = useState<addFundsMutation$data>();
  const [loading, setLoading] = useState(false);

  const [commit] = useAddFunds();

  function handleAddFunds(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setOpenPopover(false);
    const target = event.target as typeof event.target & {
      amount: { value: string };
    };

    commit({
      variables: {
        amount: target.amount.value.toString(),
        walletId: user?.wallet.id ? user?.wallet.id : location.state.wallet.id,
      },
      onCompleted(response) {
        setData(response);
        setLoading(false);
      },
    });

    refetchQueries();
  }

  return (
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
        <h2 className="text-2xl font-bold truncate text-white">Challenge </h2>
        <h2 className="text-2xl font-bold truncate text-secondary">
          Fullstack
        </h2>
      </div>

      <div className="">
        <Card className="h-[160px] max-md:min-w-[220px] min-w-[280px] flex flex-col justify-between ">
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
                        <h4 className="font-medium leading-none">Add Funds</h4>
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
                              type="number"
                              name="amount"
                              value={amount}
                              onChange={(e) =>
                                setAmount(
                                  parseFloat(e.target.value) <= 0
                                    ? "0"
                                    : e.target.value
                                )
                              }
                              className="col-span-2 h-8"
                            />
                          </div>

                          <Button
                            type="submit"
                            disabled={
                              parseFloat(amount) <= 0 ||
                              amount.trim() === "" ||
                              loading
                            }
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
  );
};
