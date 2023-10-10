import Image from "next/image";

// Assets
import Logo from "@/assets/images/logo.svg";

// Components
import Avatar from "@/components/common/Avatar";
import Dropdown from "@/components/common/Dropdown";

// Mutations
import { useUserLogout } from "@/api/mutations";

// Hooks
import { useAuth } from "@/hooks";

const Header = () => {
  const { getUser } = useAuth();
  const user = getUser();

  const { mutate, error, isError, isLoading } = useUserLogout();

  return (
    <div className="h-header flex py-6 px-6">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="13"
          viewBox="0 0 16 13"
          fill="none"
        >
          <rect width="16" height="2" fill="white" />
          <rect y="5.16174" width="16" height="2" fill="white" />
          <rect y="10.3235" width="16" height="2" fill="white" />
        </svg>
        {/* <span className="mr-auto">Hello World!</span> */}
      </div>
      <div className="flex justify-center ml-6">
        <Image src={Logo} alt="SorobanLearn" />
      </div>
      <div className="flex justify-end items-center pr-5 ml-auto">
        <Avatar className="mr-4" />
        <Dropdown
          options={[
            { icon: <i className="fa fa-user" />, label: "Profile" },
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
