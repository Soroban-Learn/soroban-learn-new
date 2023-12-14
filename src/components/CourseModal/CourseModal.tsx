import React from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import ModalLogo from "../common/ModalLogo";

import ListCheckIcon from "@/assets/images/list-check.svg";

type Props = {
  isOpenModal: boolean;
  onHandleCloseModal: () => void;
  incompletePrerequisites: () => string[];
};

const CourseModal: React.FC<Props> = ({
  isOpenModal,
  onHandleCloseModal,
  incompletePrerequisites,
}) => {
  const inCompleted = incompletePrerequisites();

  return (
    <Modal
      open={isOpenModal}
      onClose={onHandleCloseModal}
      className="!bg-transparent py-0"
      closeOnBackdropClick
      withIcon
    >
      <div className="grid gap-4 mb-6">
        <ModalLogo
          photo={ListCheckIcon}
          height={40}
          width={40}
          className="top-[-22px]"
        />
        <div className="w-full bg-white rounded-[10px] px-[30px] sm:px-[46px] pt-12 pb-[48px] text-center">
          <h2 className="text-modal-title text-[30px] capitalize tracking-[-0.3px] mb-[26px]">
            You have not completed the prerequisite courses.
          </h2>
          <p className="text-dark-gray text-[20px] tracking-[-0.2px] mb-[33px]">
            We recommend you complete the following courses before starting this
            one:
          </p>

          <ul className="mb-[55px] list-disc pl-6 flex flex-col items-center justify-center">
            {inCompleted.map((incomplete) => (
              <li
                className="text-dark-gray font-bold text-[20px] tracking-[-0.2px] "
                key={incomplete}
              >
                {incomplete}
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-4">
            <Button
              label="Go back to courses"
              className="rounded-[50px] w-full h-[70px] text-[16px] sm:text-[18px]"
              icon={<i className="fas fa-arrow-left" />}
              onClick={onHandleCloseModal}
            />

            <Button
              label="Start course without prerequisites"
              className="rounded-[50px] w-full h-[70px] text-gray-primary text-[16px] sm:text-[18px] font-black border-2 border-border-btn"
              customBgColor="inherit"
              nextIcon={<i className="fas fa-arrow-right" />}
            />
          </div>
        </div>
      </div>

      <div
        className="rounded-full border-2 border-white h-[64px] w-[64px] flex items-center justify-center mx-auto cursor-pointer"
        onClick={onHandleCloseModal}
      >
        <i className="fal fa-times text-[26px]" />
      </div>
    </Modal>
  );
};

export default CourseModal;
