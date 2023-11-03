import Image from "next/image";

// Assets
import Logo from "@/assets/images/logo.svg";

// Components
import Avatar from "@/components/common/Avatar";
import Dropdown from "@/components/common/Dropdown";

// Mutations
import { useUserLogout, useForumLogin } from "@/api/mutations";

// Hooks
import { useAuth } from "@/hooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type User = {
  username: string;
  email: string;
};

const FormLink = () => {
  const [user] = useLocalStorage<User>("user", { username: "", email: "" });

  const { mutate: validateExercise, isLoading } = useForumLogin();

  const handleForumLogin = () => {
    validateExercise({
      username: user.username,
      email: user.email,
    });
  };

  return (
    <div className="ml-auto flex gap-2 w-fit">
      Need help?{" "}
      {isLoading ? (
        <div>Redirecting...</div>
      ) : (
        <div
          className="underline cursor-pointer"
          onClick={() => handleForumLogin()}
        >
          Visit our Forum
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const { getUser } = useAuth();
  const user = getUser();

  const { mutate, error, isError, isLoading } = useUserLogout();

  return (
    <div className="h-header flex py-6 px-6">
      <div className="flex justify-center ml-6">
        <Image src={Logo} alt="SorobanLearn" />
      </div>

      <FormLink />

      <div className="flex justify-end items-center pr-5 ml-6">
        <Avatar className="mr-4" />
        <Dropdown
          options={[
            {
              icon: <i className="fa fa-arrow-right-from-bracket" />,
              label: "Sign out",
              onClick: () => mutate(),
            },
          ]}
          className="flex justify-end items-center"
        >
          <span className="mr-3.5 hidden sm:block">
            Hi, {user?.username ? user?.username : "User"}!
          </span>
          <i className="fa fa-angle-down" />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
