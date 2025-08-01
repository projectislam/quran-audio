import { useAppContext } from "@/context/AppContext";
import { downloadAudio, getAudioDetail } from "@/utils/audio.data";
import { useMediaContext } from "../../../../../context/MediaContext";
import { Button } from "./Button";

export const DownloadButton = () => {
  const { currentReciter, currentSurah } = useAppContext();
  const {
    setMediaState,
    setDownloadProgress,
    setAudioDetail,
    setAudioSource,
    player,
  } = useMediaContext();

  const handleDownload = async () => {
    setMediaState("downloading");

    const audioDetail = await getAudioDetail(currentReciter, currentSurah);
    const localUri = await downloadAudio(
      audioDetail.audio_url,
      audioDetail.id,
      setDownloadProgress
    );

    setAudioDetail(audioDetail);
    setAudioSource(localUri!);
    setMediaState("playing");
    player?.play();
  };

  return <Button icon="arrow-down" onPress={handleDownload} />;
};
