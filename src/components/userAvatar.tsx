import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/services/hooks/useGetUser";
import { useEffect, useState } from "react";

interface GitHubUser {
  avatar_url: string;
}

interface AvatarUserProps {
  user: User;
}

export const UserAvatar = ({ user }: AvatarUserProps) => {
  const [githubUser, setGithubUser] = useState<GitHubUser>();

  const getUser = async (username: string) => {
    return fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((response: GitHubUser) => {
        if (response.avatar_url) {
          setGithubUser(response);
        }
      });
  };

  useEffect(() => {
    getUser(user.email.split("/")[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Avatar_default = githubUser
    ? githubUser.avatar_url
    : "https://avatars.githubusercontent.com/u/5347799?v=4";

  return (
    <Avatar>
      <AvatarImage src={Avatar_default} />
    </Avatar>
  );
};
