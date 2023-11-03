"use client";
import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Button from "@/components/common/Button";
import ProfileInput from "@/components/common/ProfileInput";

import defaultuser from "@/assets/images/defaultuser.png";

function EditAccount() {
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
            <h1 className="text-white text-4xl font-normal">Hi, Jonathon</h1>
            <p>Member since Jan. 23, 2023</p>
          </div>

          <Button className="ml-auto">Save Changes</Button>
        </div>

        <div className="bg-neutral-800 rounded-lg p-12 mt-12">
          <h3 className="text-white text-xl font-bold">User Information</h3>
          <p className="text-zinc-500 text-base font-normal mb-10">
            Here you can edit public information about yourself
          </p>

          <form action="">
            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <ProfileInput label="Name" />
                <ProfileInput label="Email" />
              </div>

              <div className="flex gap-6">
                <ProfileInput label="New Password" />
                <ProfileInput label="Confirm New Password" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
