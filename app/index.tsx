import { Screen } from "@/components/common/Screen";
import { Header } from "@/components/HomeHeader";
import { ResumeSection } from "@/components/ResumeSection";
import { SurahList } from "@/components/SurahList";
import { useAppContext } from "@/context/AppContext";
import { useMediaContext } from "@/context/MediaContext";
import { getAudioDetailFromCache, getAudioFromCache } from "@/utils/audio.data";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";

const QuranHomeScreen = () => {
  const { currentReciter, currentSurah } = useAppContext();
  const { setAudioSource, setAudioDetail, status, player } = useMediaContext();

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
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ResumeSection />
        <SurahList />
      </ScrollView>
    </Screen>
  );
};

export default QuranHomeScreen;
