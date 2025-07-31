import { useAppContext } from "@/context/AppContext";
import { downloadAudio, getAudioDetail } from "@/utils/audio.data";
import { useMediaContext } from "../../context/MediaContext";
import { Button } from "./Button";

export const DownloadButton = () => {
  const { currentReciter, currentSurah } = useAppContext();
  const { setState, setDownloadProgress, setAudioDetail, setAudioSource } =
    useMediaContext();

  const handleDownload = async () => {
    setState("downloading");

    const audioDetail = await getAudioDetail(currentReciter, currentSurah);
    const localUri = await downloadAudio(
      audioDetail.audio_url,
      audioDetail.id,
      setDownloadProgress
    );

    setAudioDetail(audioDetail);
    setAudioSource(localUri!);
    setState("playing");
  };

  return <Button icon="arrow-down" onPress={handleDownload} />;
};
