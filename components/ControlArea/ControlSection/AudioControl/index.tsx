import { useAppContext } from "@/context/AppContext";
import { useMediaContext } from "@/context/MediaContext";
import { getAudioDetailFromCache, getAudioFromCache } from "@/utils/audio.data";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { DisplayCurrentVerse } from "./DisplayCurrentVerse";
import { MediaButton } from "./MediaButton";
import { MediaState } from "./MediaState";
import { Root } from "./Root";

export const AudioControl = () => {
  const { currentReciter, currentSurah } = useAppContext();
  const { setAudioSource, setAudioDetail, setMediaState } = useMediaContext();

  useEffect(() => {
    getMediaState();
  }, [currentReciter, currentSurah]);

  const getMediaState = async () => {
    const audioDetail = await getAudioDetailFromCache(
      currentReciter,
      currentSurah
    );

    if (!audioDetail) {
      setMediaState("download");
      return;
    }

    setAudioDetail(audioDetail);

    const { audio_url, id } = audioDetail;
    const audioFile = await getAudioFromCache(audio_url, id);

    if (!audioFile.exist) {
      setMediaState("download");
      return;
    }

    setAudioSource(audioFile.localUri);
    setMediaState("paused");
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
