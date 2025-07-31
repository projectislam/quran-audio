import { useMediaContext } from "../../context/MediaContext";
import { Button } from "./Button";

export const PlayButton = () => {
  const { setState } = useMediaContext();

  const handlePlay = () => {
    setState("playing");
  };

  return <Button icon="play" onPress={handlePlay} />;
};
