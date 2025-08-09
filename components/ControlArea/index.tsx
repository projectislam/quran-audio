import { useAppContext } from "@/context/AppContext";
import * as ScreenOrientation from "expo-screen-orientation";
import { ControlSection } from "./ControlSection";
import { ReciterSelection } from "./ReciterSection";
import { Root } from "./Root";

export const ControlArea = () => {
  const { orientation } = useAppContext();

  if (orientation !== ScreenOrientation.OrientationLock.PORTRAIT_UP) {
    return null;
  }

  return (
    <Root>
      <ControlSection />
      <ReciterSelection />
    </Root>
  );
};
