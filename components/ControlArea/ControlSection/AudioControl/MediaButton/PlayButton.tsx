import { useAppContext } from "@/context/AppContext";
import { useMediaContext } from "@/context/MediaContext";
import { Button } from "./Button";

export const PlayButton = () => {
  const { currentSurah, currentVerse } = useAppContext();
  const { setMediaState, player, goToVerse } = useMediaContext();

  const handlePlay = () => {
    const verseKey = `${currentSurah}:${currentVerse}`;
    setMediaState("playing");
    goToVerse(verseKey);
    player?.play();
  };

  return <Button icon="play" onPress={handlePlay} />;
};
