import { useAppContext } from "@/context/AppContext";
import { downloadAudio, getAudioDetail } from "@/utils/audio.data";
import { useMediaContext } from "../../context/MediaContext";
import { Button } from "./Button";

export const DownloadButton = () => {
  const { currentReciter, currentSurah } = useAppContext();
  const { setState, setDownloadProgress } = useMediaContext();

  const handleDownload = async () => {
    setState("downloading");
    const audioDetail = await getAudioDetail(currentReciter, currentSurah);
    await downloadAudio(
      audioDetail.audio_url,
      audioDetail.id,
      setDownloadProgress
    );
    setState("playing");
  };

  return <Button icon="arrow-down" onPress={handleDownload} />;
};
