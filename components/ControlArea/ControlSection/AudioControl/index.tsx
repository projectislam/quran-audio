import { useAppContext } from "@/context/AppContext";
import { getAudioDetailFromCache, getAudioFromCache } from "@/utils/audio.data";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useMediaContext } from "../context/MediaContext";
import { DisplayCurrentVerse } from "./DisplayCurrentVerse";
import { MediaButton } from "./MediaButton";
import { MediaState } from "./MediaState";
import { Root } from "./Root";

export const AudioControl = () => {
  const { currentReciter, currentSurah } = useAppContext();
  const { setState, setAudioDetail, setAudioSource } = useMediaContext();

  useEffect(() => {
    getMediaState();
  }, [currentReciter, currentSurah]);

  const getMediaState = async () => {
    const audioDetail = await getAudioDetailFromCache(
      currentReciter,
      currentSurah
    );

    if (!audioDetail) {
      setState("download");
      return;
    }

    setAudioDetail(audioDetail);

    const { audio_url, id } = audioDetail;
    const audioFile = await getAudioFromCache(audio_url, id);

    if (!audioFile.exist) {
      setState("download");
      return;
    }

    setAudioSource(audioFile.localUri);
    setState("paused");
  };

  return (
    <Root>
      <MediaButton />
      <View style={styles.infoContainer}>
        <DisplayCurrentVerse />
        <MediaState />
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    gap: 2,
  },
});
