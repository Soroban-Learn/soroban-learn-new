import { FC } from "react";

import Modal from "../common/Modal";
import { VimeoPlayer } from "../VimeoVideoPlayer";

import styles from "./styles.module.scss";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      closeOnBackdropClick
      isExitButton
      isVideoModal
      open={isOpen}
      onClose={onClose}
    >
      <div className={styles.wrapper}>
        <VimeoPlayer videoId="893430086" />
      </div>
    </Modal>
  );
};
