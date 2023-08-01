"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

import Logo from "@/assets/images/logo.svg";
import Glows from "@/assets/images/glows.svg";
import Arrows from "@/assets/images/arrows.svg";
import Rocket from "@/assets/images/rocket.svg";
import Steps from "@/assets/images/steps.svg";
import Resources from "@/assets/images/resources.svg";
import HomeCode from "@/assets/images/homecode.png";

import "@/assets/css/animations.scss";

// Hooks
import { useAuth } from "@/hooks";

// Components
import Button from "@/components/common/Button";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const { showModal, toggle } = useAuth();

  return (
    <div id="top">
      <header className="py-[35px]">
        <div className="container mx-auto flex justify-between">
          <Image src={Logo} className="SorobanLearn" alt="logo" />
          <div className="flex gap-[25px]">
            <Link
              href="https://discord.gg/xYdDBnRVK5"
              target="_blank"
              className="w-12 h-12 bg-white border-2 border-white hover:border-indigo-700 text-black flex justify-center items-center hover:bg-indigo-700 hover:text-white transition-all duration-500"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faDiscord} />
            </Link>
            <Link
              href="/exercise/hello-world"
              className="border-2 border-white sm:flex justify-center items-center px-6 hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-all duration-500 hidden"
            >
              Try Now
            </Link>
          </div>
        </div>
      </header>
      <section className="py-10 sm:py-20 overflow-hidden relative">
        <div className="container mx-auto">
          <h1 className="text-7xl sm:text-9xl text-white font-extralight mb-16 mt-16">
            New to <span className="font-medium">Soroban</span>?
          </h1>
          <div className="flex flex-col-reverse lg:flex-row justify-between">
            <div className="w-fill lg:w-[475px] relative">
              <Image
                src={Arrows}
                alt="Arrows"
                className="absolute -z-10 -top-10 -left-14 moving-image"
              />
              <p className="text-xl leading-7 text-white mb-6 mt-6">
                Soroban Learn is a tool that makes it easy for new developers to
                get their feet wet into learning the basics of creating smart
                contracts in Soroban.
              </p>
              <p className="text-lg leading-relaxed text-gray-400 mb-12">
                It will walk you through creating your first “Hello World”
                contract and finish up with a token swap contract.
              </p>
              <Button onClick={toggle}>
                Get Started
              </Button>
            </div>

            <div>
              <Image src={HomeCode} alt="Home Code" className="ml-auto" />
              <Image
                src={Glows}
                alt="glows"
                className="absolute top-0 right-0 opacity-60 -z-10 moving-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto">
          <div className="flex justify-between gap-[130px] flex-col lg:flex-row">
            <div className="flex flex-col justify-center items-center text-center gap-5">
              <Image src={Rocket} alt="Rocket" className="max-w-[250px]" />
              <h2 className="text-center text-white text-[24px] font-medium">
                No Local Setup
              </h2>
              <p className="text-center text-slate-400 text-[18px] font-normal">
                Soroban Learn requires no local setup. No need to install any
                packages or even open your code editor
              </p>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-5">
              <Image src={Steps} alt="Steps" className="max-w-[250px]" />
              <h2 className="text-center text-white text-[24px] font-medium">
                Step by step instructions
              </h2>
              <p className="text-center text-slate-400 text-[18px] font-normal">
                Soroban Learn requires no local setup. No need to install any
                packages or even open your code editor
              </p>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-5">
              <Image
                src={Resources}
                alt="Resources"
                className="max-w-[250px]"
              />
              <h2 className="text-center text-white text-[24px] font-medium">
                Post Resources
              </h2>
              <p className="text-center text-slate-400 text-[18px] font-normal">
                Soroban Learn requires no local setup. No need to install any
                packages or even open your code editor
              </p>
            </div>
          </div>
        </div>
      </section>
      <AuthModal showModal={showModal} toggle={toggle} />
    </div>
  );
}
