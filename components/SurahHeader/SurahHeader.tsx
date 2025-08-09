import { useAppContext } from "@/context/AppContext";
import * as ScreenOrientation from "expo-screen-orientation";
import { BackButton } from "./BackButton";
import { Root } from "./Root";
import { SurahDetail } from "./SurahDetail";

export const SurahHeader = () => {
  const { orientation } = useAppContext();

  if (orientation !== ScreenOrientation.OrientationLock.PORTRAIT_UP) {
    return null;
  }

  return (
    <Root>
      <BackButton />
      <SurahDetail />
    </Root>
  );
};
