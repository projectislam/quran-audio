import { Screen } from "@/components/common/Screen";
import { Header } from "@/components/HomeHeader";
import { ResumeSection } from "@/components/ResumeSection";
import { SurahList } from "@/components/SurahList";
import { useAppContext } from "@/context/AppContext";
import { useMediaContext } from "@/context/MediaContext";
import { getAudioDetailFromCache, getAudioFromCache } from "@/utils/audio.data";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";

const QuranHomeScreen = () => {
  const { currentReciter, currentSurah, setOrientation } = useAppContext();
  const { setAudioSource, setAudioDetail, status, player } = useMediaContext();

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
    getMediaState();
  }, [currentReciter, currentSurah]);

  const getMediaState = async () => {
    const audioDetail = await getAudioDetailFromCache(
      currentReciter,
      currentSurah
    );

    if (!audioDetail) {
      if (status?.playing) player?.pause();
      setAudioDetail(null);
      return;
    }

    setAudioDetail(audioDetail);

    const { audio_url, id } = audioDetail;
    const audioFile = await getAudioFromCache(audio_url, id);

    if (!audioFile.exist) {
      if (status?.playing) player?.pause();
      setAudioSource(null);
      return;
    }

    setAudioSource(audioFile.localUri);
  };

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            elevation: 20,
          }}
        >
          <Header />
        </View>
        <ScrollView
          contentContainerStyle={{ paddingTop: 80 }}
          showsVerticalScrollIndicator={false}
        >
          <ResumeSection />
          <SurahList />
        </ScrollView>
      </View>
    </Screen>
  );
};

export default QuranHomeScreen;
