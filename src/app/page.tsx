"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const { showModal, toggle, isAuth } = useAuth();

  const isLoggedIn = isAuth();

  return (
    <div id="top">
      <header className="py-[35px]">
        <div className="container mx-auto flex justify-between mt-10">
          <Image src={Logo} className="SorobanLearn" alt="logo" />
          <div className="flex gap-[25px]">
            <Link
              href="https://discord.gg/xYdDBnRVK5"
              target="_blank"
              className="w-12 h-12 bg-white border-2 border-white hover:border-indigo-700 text-black flex justify-center items-center hover:bg-indigo-700 hover:text-white transition-all duration-500"
              rel="noreferrer"
            >
              <i className="fab fa-discord" />
            </Link>
            <Button
              onClick={() =>
                isLoggedIn ? router.push("/dashboard") : toggle()
              }
              className="border-2 border-white sm:flex bg-transparent justify-center items-center !py-0 px-6 hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-all duration-500 hidden"
            >
              {isLoggedIn ? "Back to Dashboard" : "Try Now"}
            </Button>
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
                Dive into smart contract development with ease. Soroban Learn is
                your personal guide, designed for newcomers to seamlessly start
                their journey in the world of Soroban smart contracts.
              </p>
              <Button
                onClick={() =>
                  isLoggedIn ? router.push("/dashboard") : toggle()
                }
              >
                {isLoggedIn ? "Back to Dashboard" : "Get Started"}
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
                No Installation Required
              </h2>
              <p className="text-center text-slate-400 text-[18px] font-normal">
                Jump right in without any setup hassles. Directly dive into
                learning using our online platform.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-5">
              <Image src={Steps} alt="Steps" className="max-w-[250px]" />
              <h2 className="text-center text-white text-[24px] font-medium">
                Guided Learning
              </h2>
              <p className="text-center text-slate-400 text-[18px] font-normal">
                Follow intuitive, step-by-step instructions to build your
                knowledge.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-5">
              <Image
                src={Resources}
                alt="Resources"
                className="max-w-[250px]"
              />
              <h2 className="text-center text-white text-[24px] font-medium">
                Extensive Resources
              </h2>
              <p className="text-center text-slate-400 text-[18px] font-normal">
                Access a wealth of information to support your learning, all
                with no extra setup needed.
              </p>
            </div>
          </div>
        </div>
      </section>
      <AuthModal showModal={showModal} toggle={toggle} />
    </div>
  );
}
