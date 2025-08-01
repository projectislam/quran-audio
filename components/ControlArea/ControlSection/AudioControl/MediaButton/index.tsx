import { useMediaContext } from "@/context/MediaContext";
import { useMemo } from "react";
import { DownloadButton } from "./DownloadButton";
import { DownloadingButton } from "./DownloadingButton";
import { LoadingButton } from "./Loading";
import { PauseButton } from "./PauseButton";
import { PlayButton } from "./PlayButton";

export const MediaButton = () => {
  const { status, audioDetail, audioSource, downloadProgress } =
    useMediaContext();

  const state = useMemo(() => {
    if (downloadProgress < 100 && downloadProgress > 0) return "downloading";
    if (!audioDetail || !audioSource) return "download";
    if (status?.playing) return "playing";
    if (status?.isLoaded) return "paused";
    return "loading";
  }, [status, audioDetail, audioSource, downloadProgress]);

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
