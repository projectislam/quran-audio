import { useMediaContext } from "../../context/MediaContext";
import { Button } from "./Button";

export const PauseButton = () => {
  const { setState } = useMediaContext();

  const handlePause = () => {
    setState("paused");
  };

  return <Button icon="pause" onPress={handlePause} />;
};
