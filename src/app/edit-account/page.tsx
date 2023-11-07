"use client";
import React, { useEffect, useState } from "react";
import toast, { Themes } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/moonlight.css";

import Image from "next/image";
import Header from "@/components/Header";
import Button from "@/components/common/Button";
import ProfileInput from "@/components/common/ProfileInput";

import defaultuser from "@/assets/images/defaultuser.png";

import { useUserProfile } from "@/api/mutations";

function EditAccount() {
  const [user, setUser] = useState({ username: "", email: "" });
  const { userProfileUpdateMutation } = useUserProfile();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    userProfileUpdateMutation.mutate(user);

    toast("Profile Updated", { theme: "dark" });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="container">
        <div className="w-full flex items-center gap-10 mt-12">
          <div className="w-36 h-36 rounded-full shadow overflow-hidden relative">
            <Image
              src={defaultuser}
              alt="defaultuser"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-white text-4xl font-normal">
              Hi, {user.username}
            </h1>
            {/* <p>Member since Jan. 23, 2023</p> */}
          </div>
        </div>

        <div className="bg-neutral-800 rounded-lg p-12 mt-12">
          <h3 className="text-white text-xl font-bold">User Information</h3>
          <p className="text-zinc-500 text-base font-normal mb-10">
            Here you can edit public information about yourself
          </p>

          <form action="" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <ProfileInput
                  label="Username"
                  onChange={handleInputChange}
                  name="username"
                  value={user.username}
                />

                <ProfileInput
                  label="Email"
                  name="email"
                  onChange={handleInputChange}
                  value={user.email}
                />
              </div>

              {/* <div className="flex gap-6">
                <ProfileInput label="New Password" />
                <ProfileInput label="Confirm New Password" />
              </div> */}
            </div>

            <Button className="ml-auto mt-8" type="submit">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
