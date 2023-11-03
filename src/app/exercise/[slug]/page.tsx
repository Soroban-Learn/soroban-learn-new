"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

// Packages
import ReactMarkdown from "react-markdown";
import { useRecoilState, RecoilRoot } from "recoil";

// Assets
import Logo from "@/assets/images/logo.svg";

// Components
import IDE from "@/components/IDE";
import Terminal from "@/components/terminal";
// import FileExplorer from "../../Components/FileExplorer";

// Utils
import { H2, H3, H4, P, Code, A } from "@/utils/markdownFunctions";
import { currentStepState, currentLessonState } from "@/utils/recoilState";
import { useStepValidation } from "@/utils/stepValidation";

// Learn Content
import helloWorld from "@/learningMaterial/helloWorld.json";

export default function Home() {
  const [currentStep, setCurrentContentStep] = useRecoilState(currentStepState);
  const [lessonContent, setLessonContent] = useRecoilState(currentLessonState);
  const [stepType, setStepType] = useState("");
  const { validateStep } = useStepValidation(
    currentStep,
    setCurrentContentStep,
    null,
    false,
    ""
  );
  useEffect(() => {
    setLessonContent(helloWorld);
  }, []);

  const fileStructure = [
    {
      title: "Main",
      type: "folder",
      children: [
        {
          title: "src.rs",
          type: "file",
        },
      ],
    },
  ];

  const handleStepProgression = () => {
    validateStep && validateStep();
  };

  useEffect(() => {
    setStepType(
      (lessonContent?.steps &&
        lessonContent.steps.length &&
        lessonContent.steps[currentStep]?.stepType) ||
        ""
    );
  }, [currentStep, lessonContent]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="h-[80px] grid grid-cols-3 items-stretch py-6 px-6">
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
          <span className="mr-auto">Hello World!</span>
        </div>
        <div className="flex justify-center">
          <Image src={Logo} alt="SorobanLearn" />
        </div>
      </div>
      {/* CORE */}
      <div
        className="flex gap-4"
        style={{
          height: "calc(100vh - 80px)",
        }}
      >
        <div className="w-2/5 flex flex-col gap-4">
          {/* Exercise */}
          <div className="px-12 h-full overflow-scroll">
            {lessonContent.steps &&
              currentStep < lessonContent.steps.length && (
                <>
                  <h3 className="text-lg leading-loose">Current Exercise</h3>
                  <h2 className="text-5xl font-semibold mb-6">
                    {lessonContent.title}
                  </h2>
                </>
              )}
            {/* Sidebar */}
            <div>
              {lessonContent.steps &&
              currentStep < lessonContent.steps.length ? (
                <>
                  <h3 className="text-lg leading-loose">
                    {lessonContent.steps[currentStep].stepTitle}
                  </h3>
                  <ReactMarkdown
                    components={{
                      p: P,
                      h2: H2,
                      code: Code,
                      h3: H3,
                      h4: H4,
                      a: A,
                    }}
                  >
                    {lessonContent.steps[currentStep].stepContent}
                  </ReactMarkdown>
                </>
              ) : (
                <div className="text-center">
                  <h3 className="text-xl leading-loose mt-10 font-bold">
                    Thank you for testing SorobanLearn!
                  </h3>
                  <p>
                    SorobanLearn is still in development. If you have any
                    feedback or suggestions, please reach out to us on Discord.
                  </p>

                  <a
                    href="https://discord.gg/xYdDBnRVK5"
                    target="_blank"
                    className="bg-indigo-600 py-2 px-4 mt-6 block w-fit mx-auto"
                    rel="noreferrer"
                  >
                    Join our Discord
                  </a>
                </div>
              )}
            </div>
            {stepType !== "terminal" &&
              lessonContent.steps &&
              currentStep < lessonContent.steps.length && (
                <button
                  className="bg-indigo-600 py-2 px-4 rounded-md mt-5 float-right"
                  onClick={() => handleStepProgression()}
                >
                  Next Step
                </button>
              )}
          </div>

          {/* <FileExplorer fileStructure={fileStructure} /> */}
        </div>

        <div className="w-full flex flex-col gap-4">
          <IDE isDisabled={stepType === "terminal"} />

          <Terminal />
        </div>
      </div>
    </div>
  );
}
