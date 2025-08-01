import { useMediaContext } from "@/context/MediaContext";
import { Button } from "./Button";

export const PauseButton = () => {
  const { player } = useMediaContext();

  const handlePause = () => {
    player?.pause();
  };

  return <Button icon="pause" onPress={handlePause} />;
};
