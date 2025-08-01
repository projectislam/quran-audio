import { useMediaContext } from "@/context/MediaContext";
import { Button } from "./Button";

export const PauseButton = () => {
  const { setMediaState, player } = useMediaContext();

  const handlePause = () => {
    setMediaState("paused");
    player?.pause();
  };

  return <Button icon="pause" onPress={handlePause} />;
};
