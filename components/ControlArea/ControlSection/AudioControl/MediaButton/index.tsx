import { DownloadButton } from "./DownloadButton";
import { PauseButton } from "./PauseButton";
import { PlayButton } from "./PlayButton";

export const MediaButton = () => {
  const state: any = "downloading";

  switch (state) {
    case "downloading":
      return <DownloadButton />;
    case "playing":
      return <PlayButton />;
    case "paused":
      return <PauseButton />;
  }
};
