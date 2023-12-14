import { FC } from "react";

import Modal from "../common/Modal";
import { VimeoPlayer } from "../VimeoVideoPlayer";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <Modal closeOnBackdropClick isVideoModal open={isOpen} onClose={onClose}>
      <VimeoPlayer videoId="893430086" />
    </Modal>
  );
};
