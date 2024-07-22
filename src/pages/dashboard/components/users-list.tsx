import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetUsers } from "@/services/hooks/useGetUsers";
import { Loader2 } from "lucide-react";
import { User } from "@/services/hooks/useGetUser";
import { CardUserToTransfer } from "./card-user-to-transfer";

interface userListProps {
  myUser: User;
  refetch: () => void;
}

export const UserList = ({ myUser, refetch }: userListProps) => {
  const { data: getUsersData, loading: getUsersLoading } = useGetUsers();

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
                <CardUserToTransfer
                  userToTransfer={user}
                  currentUser={myUser}
                  refetch={refetch}
                  key={user.id}
                />
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
