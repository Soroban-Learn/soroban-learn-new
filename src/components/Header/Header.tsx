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

  const handleForumLogin = () => {
    // Define your URL
    const apiUrl = "http://localhost:3000/api/forum";

    let user = localStorage.getItem("user");

    if (!user) return;
    const parsedUser = JSON.parse(user) as { username: string; email: string };
    if (!parsedUser) return;

    // Define the data you want to send
    const postData = {
      username: parsedUser.username,
      email: parsedUser.email,
    };

    // Create an options object that includes custom headers, method, and body
    const requestOptions = {
      method: "POST", // Specify the request method
      headers: {
        "Content-Type": "application/json", // Specify any necessary headers
      },
      body: JSON.stringify(postData), // Convert your payload into a JSON string
    };

    // Make a POST request with your specified options
    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          // If the response status code is not OK, throw an error to catch later
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse and return the JSON response body
      })
      .then((data) => {
        // Handle your data from the response here
        console.log("Success:", data);
      })
      .catch((error) => {
        // Catch and log any errors from the request
        console.error("Error:", error);
      });
  };

  return (
    <div className="h-header flex py-6 px-6">
      {/* <div className="flex items-center gap-2">
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
      </div> */}
      <div className="flex justify-center ml-6">
        <Image src={Logo} alt="SorobanLearn" />
      </div>
      <div className="ml-auto flex gap-2 w-fit">
        Need help?{" "}
        <div
          className="underline cursor-pointer"
          onClick={() => handleForumLogin()}
        >
          Join our Forum
        </div>
      </div>
      <div className="flex justify-end items-center pr-5 ml-6">
        <Avatar className="mr-4" />
        <Dropdown
          options={[
            // { icon: <i className="fa fa-user" />, label: "Profile" },
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
