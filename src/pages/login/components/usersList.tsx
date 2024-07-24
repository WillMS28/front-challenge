import { QueryRenderer } from "react-relay";

import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCardLogin } from "./userCardLogin";
import { RelayEnvironment } from "@/RelayEnvironment";
import { User } from "@/types/user";
import { usersQueryGraphQL } from "@/graphql/users";

interface UsersData {
  users: User[];
}

export const UserList = () => {
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
          return <div>Loading...</div>;
        } else {
          return (
            <div className="flex flex-col items-center rounded-md border h-80 py-3 min-w-64 w-full max-md:w-full max-w-[480px]">
              <h2 className="font-semibold text-sm text-white pb-2">
                sign in using an existing
              </h2>
              <div className="w-full">
                <ScrollArea className="h-64 ">
                  <div className="gap-2 flex flex-col rounded-lg">
                    {usersData.users.map((user) => {
                      return <UserCardLogin key={user.id} user={user} />;
                    })}
                  </div>
                </ScrollArea>
              </div>
            </div>
          );
        }
      }}
    />
  );
};
