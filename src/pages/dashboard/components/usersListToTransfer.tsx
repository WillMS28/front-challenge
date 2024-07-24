import { ScrollArea } from "@/components/ui/scroll-area";
import { CardUserToTransfer } from "./cardUserToTransfer";
import {  QueryRenderer } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { Loader2 } from "lucide-react";
import { usersQueryGraphQL } from "@/graphql/users";
import { User } from "@/types/user";

interface userListProps {
  myUser: User;
  refetch: () => void;
}

interface UsersData {
  users: User[];
}


export const UserListToTransfer = ({ myUser, refetch }: userListProps) => {
  return (
    <QueryRenderer
      variables={{}}
      environment={RelayEnvironment}
      query={usersQueryGraphQL}
      render={({ error, props }) => {
        const usersData = props as UsersData;

        if (error) {
          return <div>Error! {error.message}</div>;
        } else if (!props) {
          return (
            <div className="flex justify-center items-center">
              <Loader2 className="mr-2 h-8 w-8 animate-spin text-secondary" />
            </div>
          );
        } else {
          return (
            <ScrollArea className="flex flex-col gap-2 w-full max-h-[530px] p-2">
              {usersData.users.map((user) => {
                return (
                  <CardUserToTransfer
                    userToTransfer={user}
                    currentUser={myUser}
                    refetch={refetch}
                    key={user.id}
                  />
                );
              })}
            </ScrollArea>
          );
        }
      }}
    />
  );

  /*  return (
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
  );*/
};
