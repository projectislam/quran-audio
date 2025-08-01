import { useMediaContext } from "@/context/MediaContext";
import { State } from "./State";

export const Downloading = () => {
  const { downloadProgress } = useMediaContext();

  return <State state={`Downloading...${Math.round(downloadProgress)}%`} />;
};
