import React, { useEffect, useRef } from "react";
import Player from "@vimeo/player";

interface VimeoPlayerProps {
  videoId: string;
  width?: number;
  height?: number;
}

export const VimeoPlayer: React.FC<VimeoPlayerProps> = ({
  videoId,
  width = 640,
  height = 360,
}) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerRef.current) {
      // Initialize Vimeo Player
      const player = new Player(playerRef.current, {
        id: parseInt(videoId),
        width,
        height,
      });

      // You can add event listeners here if needed
      player.on("play", () => {
        console.log("Video is playing");
      });

      // Cleanup on unmount
      return () => {
        player.destroy();
      };
    }
  }, [videoId, width, height]);

  return <div ref={playerRef} />;
};
