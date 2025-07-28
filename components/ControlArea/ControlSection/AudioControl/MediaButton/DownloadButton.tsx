import { useAppContext } from "@/context/AppContext";
import { useMediaContext } from "../context/MediaContext";
import { Button } from "./Button";

export const DownloadButton = () => {
  const { currentReciter, currentSurah } = useAppContext();
  const { setState } = useMediaContext();

  const handleDownload = async () => {
    setState("downloading");
  };

  return <Button icon="arrow-down" onPress={handleDownload} />;
};
