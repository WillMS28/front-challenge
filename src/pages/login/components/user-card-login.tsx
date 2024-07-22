import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/userAvatar";
import { User } from "@/services/hooks/useGetUser";
import { useNavigate } from "react-router-dom";

interface UserCardLoginProps {
  user: User;
}

export const UserCardLogin = ({ user }: UserCardLoginProps) => {
  const navigate = useNavigate();

  const handleSelectUser = (): void => {
    localStorage.setItem("user", JSON.stringify(user));
    // navegar para dashboard
    navigate("/dashboard", {state: user});
  };

  return (
    <Button
      className="w-auto mx-2 rounded-lg space-x-2 h-auto"
      variant="outline"
      onClick={handleSelectUser}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start">
          <p className="text-sm text-zinc-600 truncate ">{user.name}</p>
          <p className="text-sm text-zinc-500">{user.email}</p>
        </div>

        <UserAvatar user={user} />
      </div>
    </Button>
  );
};
