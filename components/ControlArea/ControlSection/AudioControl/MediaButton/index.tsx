import { useMediaContext } from "../../context/MediaContext";
import { DownloadButton } from "./DownloadButton";
import { DownloadingButton } from "./DownloadingButton";
import { LoadingButton } from "./Loading";
import { PauseButton } from "./PauseButton";
import { PlayButton } from "./PlayButton";

export const MediaButton = () => {
  const { state } = useMediaContext();

  switch (state) {
    case "downloading":
      return <DownloadingButton />;
    case "download":
      return <DownloadButton />;
    case "playing":
      return <PauseButton />;
    case "paused":
      return <PlayButton />;
    case "loading":
      return <LoadingButton />;
  }
};
