import { BottomSpacing } from "@/components/common/BottomSpacing";
import { Screen } from "@/components/common/Screen";
import { ControlArea } from "@/components/ControlArea";
import { AudioPlayer } from "@/components/ControlArea/ControlSection/AudioControl/AudioPlayer";
import { DisplaySurahVerses } from "@/components/DisplaySurahVerses";
import { SurahHeader } from "@/components/SurahHeader/SurahHeader";
import { useAppContext } from "@/context/AppContext";
import { useMediaContext } from "@/context/MediaContext";
import { useKeepAwake } from "expo-keep-awake";
import { router } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect } from "react";
import { BackHandler } from "react-native";

const SurahDetailScreen = () => {
  useKeepAwake();

  const { setOrientation, orientation } = useAppContext();
  const { player } = useMediaContext();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      if (orientation !== ScreenOrientation.OrientationLock.PORTRAIT_UP) {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
        setOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      } else {
        if (player?.playing) {
          player?.pause();
        }
        router.back();
      }

      return true; // prevent default
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => subscription.remove();
  }, [orientation, player]);

  return (
    <Screen>
      <SurahHeader />
      <ControlArea />
      <AudioPlayer />
      <DisplaySurahVerses />
      <BottomSpacing />
    </Screen>
  );
};

export default SurahDetailScreen;
