import { useMediaContext } from "@/context/MediaContext";
import { useMemo } from "react";
import { Download } from "./Download";
import { Downloading } from "./Downloading";
import { Loading } from "./Loading";
import { Paused } from "./Paused";
import { Playing } from "./Playing";

export const MediaState = () => {
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
      return <Downloading />;
    case "download":
      return <Download />;
    case "playing":
      return <Playing />;
    case "paused":
      return <Paused />;
    case "loading":
      return <Loading />;
  }
};
