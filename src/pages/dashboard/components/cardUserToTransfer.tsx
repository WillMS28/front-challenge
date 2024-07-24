import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserAvatar } from "@/components/userAvatar";
import { sendFundsMutation$data } from "@/graphql/__generated__/sendFundsMutation.graphql";
import { useSendFunds } from "@/services/hooks/useSendFunds";
import { User } from "@/types/user";
import { useState } from "react";

interface SendFundsType {
  userToSend: User;
}

interface cardUserToTransferProps {
  currentUser: User;
  userToTransfer: User;
  refetch: () => void;
}

export const CardUserToTransfer = ({
  currentUser,
  refetch,
  userToTransfer,
}: cardUserToTransferProps) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [amount, setAmount] = useState("0");

  const [, setData] = useState<sendFundsMutation$data>();
  const [loading, setLoading] = useState(false);

  const [commit] = useSendFunds();

  const handleSendFunds = ({ userToSend }: SendFundsType) => {
    setOpenPopover(false);
    setLoading(true);
    commit({
      variables: {
        fromWalletId: currentUser.wallet.id,
        toWalletId: userToSend.wallet.id,
        amount,
      },
      onCompleted(response) {
        setData(response);
        refetch();
        setLoading(false);
      },
    });
  };

  return (
    <div className="w-full py-1">
      <Popover onOpenChange={setOpenPopover} open={openPopover}>
        <PopoverTrigger asChild>
          <Button
            className="w-full rounded-lg space-x-2 h-auto"
            variant="outline"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col items-start w-0 flex-1">
                <p className="text-sm text-zinc-600 truncate ">
                  {userToTransfer.name}
                </p>
                <p className="text-sm text-zinc-500"> {userToTransfer.email}</p>
              </div>

              <UserAvatar user={userToTransfer} />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">
                {userToTransfer.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                Fill in the details to make your transfer.
              </p>
            </div>
            <form action="">
              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) =>
                      setAmount(
                        parseFloat(e.target.value) <= 0 ? "0" : e.target.value
                      )
                    }
                    className="col-span-2 h-8"
                  />
                </div>

                <Button
                  className="bg-secondary hover:bg-secondary-hover"
                  disabled={
                    parseFloat(amount) <= 0 ||
                    parseFloat(amount) > parseFloat(currentUser.wallet.balance) ||
                    amount.trim() === "" ||
                    loading
                  }
                  onClick={() =>
                    handleSendFunds({ userToSend: userToTransfer })
                  }
                >
                  {loading ? "loading" : "Transfer"}
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
