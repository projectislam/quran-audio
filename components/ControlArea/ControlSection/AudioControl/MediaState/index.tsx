import { useMediaContext } from "@/context/MediaContext";
import { Download } from "./Download";
import { Downloading } from "./Downloading";
import { Loading } from "./Loading";
import { Paused } from "./Paused";
import { Playing } from "./Playing";

export const MediaState = () => {
  const { mediaState } = useMediaContext();

  switch (mediaState) {
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
