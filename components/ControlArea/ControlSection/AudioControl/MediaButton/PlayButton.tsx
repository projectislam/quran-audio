import { useAppContext } from "@/context/AppContext";
import { getAudioDetailFromCache, getAudioFromCache } from "@/utils/audio.data";
import { useMediaContext } from "../../context/MediaContext";
import { Button } from "./Button";

export const PlayButton = () => {
  const { currentReciter, currentSurah } = useAppContext();
  const { setAudioSource, setState } = useMediaContext();

  const handlePlay = async () => {
    const audioDetail = await getAudioDetailFromCache(
      currentReciter,
      currentSurah
    );
    const audioFile = await getAudioFromCache(
      audioDetail.audio_url,
      audioDetail.id
    );

    setAudioSource(audioFile.localUri);
    setState("playing");
  };

  return <Button icon="play" onPress={handlePlay} />;
};
