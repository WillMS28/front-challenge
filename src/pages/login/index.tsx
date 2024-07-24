import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateUser } from "@/services/hooks/useCreateUser";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserList } from "./components/usersList";
import { createUserMutation$data } from "@/graphql/__generated__/createUserMutation.graphql";


const githubUrlPattern = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+$/;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [data, setData] = useState<createUserMutation$data>();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [gitUser, setGitUser] = useState("");

  const [inputGitUser, setInputGitUser] = useState<string>("");

  // const [createUser, { data, loading, error, called }] = useCreateUser();

  const [commit, isInFlight] = useCreateUser();

   const handleFocus = (): void => {
    if (inputGitUser === "") {
      setInputGitUser("github.com/");
    }
  };

  const handleBlur = (): void => {
    if (inputGitUser === "github.com/") {
      setInputGitUser("");
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    validateForm(event.target.value, gitUser);
  };

  const handleGithubChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;

    if (!value.startsWith("github.com/")) {
      setInputGitUser("github.com/");
    } else {
      setInputGitUser(value);
    }
    const isValidGitHubUrl = githubUrlPattern.test(value);
    setGitUser(isValidGitHubUrl ? value : "");
    validateForm(name, isValidGitHubUrl ? value : "");
  };

  const validateForm = (nameValue: string, gitUserValue: string) => {
    if (nameValue.trim() !== "" && gitUserValue.trim() !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleCreateUser = (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      gitUser: { value: string };
    };

    const name = target.name.value;
    const email = target.gitUser.value;
    commit({
      variables: { name, email },
      onCompleted(response) {
        setData(response);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    if (!isInFlight && data) {
      // salvar usuário criado
      localStorage.setItem("user", JSON.stringify(data.createUser));

      // navegar para dashboard
      navigate("/dashboard", { state: data.createUser });
    }
  }, [data, isInFlight, navigate]);

  return (
    <div className="flex flex-col w-[90%] max-w-[1280px] space-y-6 justify-center shadow-lg bg-primary bg-opacity-80 rounded-lg backdrop-blur-sm p-6">
      <div className="flex w-full justify-center items-center pb-4">
        <h2 className="text-2xl font-bold truncate text-white">Challenge </h2>
        <h2 className="text-2xl font-bold truncate text-secondary">
          Fullstack
        </h2>
      </div>

      <div className="flex gap-6 h-full items-center justify-center max-md:flex-col">
        <div className="flex justify-center items-center w-full">
          <Card className="flex flex-col justify-center rounded-md w-full border min-w-64 h-80 max-md:w-full max-w-[480px] shadow-lg ">
            <CardHeader>
              <CardTitle className="truncate text-lg text-zinc-700">
                Create a new user
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleCreateUser}>
              <CardContent className="flex flex-col gap-2">
                <Input
                  placeholder="Full name"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                />
                <Input
                  type="text"
                  name="gitUser"
                  value={inputGitUser}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleGithubChange}
                  placeholder="Github"
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className=" rounded-lg space-x-2 h-auto bg-secondary hover:bg-secondary-hover w-full"
                  variant="default"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        <span className="text-sm fonts text-white">or</span>
        <UserList />
      </div>
    </div>
  );
};
