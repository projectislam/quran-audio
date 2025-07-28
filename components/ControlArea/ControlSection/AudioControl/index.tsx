import { useAppContext } from "@/context/AppContext";
import { getAudioDetailFromCache, getAudioFromCache } from "@/utils/audio.data";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { DisplayCurrentVerse } from "./DisplayCurrentVerse";
import { MediaButton } from "./MediaButton";
import { MediaState } from "./MediaState";
import { Root } from "./Root";
import { useMediaContext } from "./context/MediaContext";

export const AudioControl = () => {
  const { currentReciter, currentSurah } = useAppContext();
  const { setState } = useMediaContext();

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

    const { audioUrl, id } = audioDetail;
    const audioFile = await getAudioFromCache(audioUrl, id);

    if (!audioFile.exist) {
      setState("download");
      return;
    }

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
