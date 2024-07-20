import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCardLogin } from "../login/user-card-login";
import { useGetUsers } from "@/services/hooks/useGetUsers";
import { Loader2 } from "lucide-react";

export const UserList = () => {
  const { data, loading } = useGetUsers();

  return (
    <div className="flex flex-col items-center rounded-md border h-80 py-3 min-w-64 w-full max-md:w-full max-w-[480px]">
      <h2 className="font-semibold text-sm text-white pb-2">
        sign in using an existing
      </h2>
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-secondary" />
          </div>
        ) : Array.isArray(data?.users) && data.users.length > 0 ? (
          <ScrollArea className="h-64 ">
            <div className="gap-2 flex flex-col rounded-lg">
              {data.users.map((user) => {
                return <UserCardLogin key={user.id} user={user} />;
              })}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex justify-center items-center">
            <span className="font-semibold text-sm text-white pb-2">
              no users found
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

