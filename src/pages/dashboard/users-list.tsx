import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetUsers } from "@/services/hooks/useGetUsers";
import { Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/userAvatar";
import { useSendFunds } from "@/services/hooks/useSendFunds";
import { useState } from "react";
import { User } from "@/services/hooks/useGetUser";

interface userListProps {
  myUser: User;
  refetch: () => void;
}

interface SendFundsType {
  userToSend: User;
}

export const UserList = ({ myUser, refetch }: userListProps) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [amount, setAmount] = useState(0);

  const { data: getUsersData, loading: getUsersLoading } = useGetUsers();
  const [sendFunds, { loading }] = useSendFunds();

  const handleSendFunds = ({ userToSend }: SendFundsType) => {
    setOpenPopover(false);

    sendFunds({
      variables: {
        fromWalletId: myUser.wallet.id,
        toWalletId: userToSend.wallet.id,
        amount,
      },
    });
    refetch();
  };

  return (
    <>
      {" "}
      {getUsersLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="mr-2 h-8 w-8 animate-spin text-secondary" />
        </div>
      ) : Array.isArray(getUsersData?.users) &&
        getUsersData.users.length > 0 ? (
        <ScrollArea className="flex flex-col gap-2 w-full max-h-[530px] p-2">
          {getUsersData.users.map((user) => {
            if (myUser.id !== user.id) {
              return (
                <div key={user.id} className="w-full py-1">
                  <Popover onOpenChange={setOpenPopover} open={openPopover}>
                    <PopoverTrigger asChild>
                      <Button
                        className="w-full rounded-lg space-x-2 h-auto"
                        variant="outline"
                      >
                        <div className="flex justify-between items-center w-full">
                          <div className="flex flex-col items-start">
                            <p className="text-sm text-zinc-600 truncate ">
                              {user.name}
                            </p>
                            <p className="text-sm text-zinc-500">
                              {" "}
                              {user.email}
                            </p>
                          </div>

                          <UserAvatar user={user} />
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            {user.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Fill in the details to make your transfer.
                          </p>
                        </div>
                        <div className="grid gap-4">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                              type="number"
                              value={amount}
                              onChange={(e) =>
                                setAmount(parseFloat(e.target.value))
                              }
                              className="col-span-2 h-8"
                            />
                          </div>

                          <Button
                            className="bg-secondary hover:bg-secondary-hover"
                            disabled={amount <= 0 || loading}
                            onClick={() =>
                              handleSendFunds({ userToSend: user })
                            }
                          >
                            {loading ? "loading" : "Transfer"}
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              );
            }
          })}
        </ScrollArea>
      ) : (
        <div className="flex justify-center items-center">
          <span className="font-semibold text-sm text-white pb-2">
            no users found
          </span>
        </div>
      )}
    </>
  );
};
