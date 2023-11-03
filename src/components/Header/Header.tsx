import Image from "next/image";

// Assets
import Logo from "@/assets/images/logo.svg";

// Components
import Avatar from "@/components/common/Avatar";
import Dropdown from "@/components/common/Dropdown";

// Mutations
import { useUserLogout } from "@/api/mutations";

// Queries
import { useGetForum } from "@/api/queries";

// Hooks
import { useAuth } from "@/hooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type User = {
  username: string;
  email: string;
};

const FormLink = () => {
  const [user] = useLocalStorage<User>("user", { username: "", email: "" });

  const { data, error, isError, isLoading, refetch } = useGetForum({
    username: user.username,
    email: user.email,
  });

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleForumLogin = () => {
    refetch();

    if (data.authtoken) {
      openInNewTab(
        `https://forum.sorobanlearn.com/?authtoken=${data.authtoken}&remember=1`
      );
    }
  };

  return (
    <div className="ml-auto flex gap-2 w-fit">
      Need help?{" "}
      {!isLoading ? (
        <div
          className="underline cursor-pointer"
          onClick={() => handleForumLogin()}
        >
          Join our Forum
        </div>
      ) : (
        <p>Navigating...</p>
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
