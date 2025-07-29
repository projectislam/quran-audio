import { useAppContext } from "@/context/AppContext";
import { getAudioDetailFromCache } from "@/utils/audio.data";
import { useAudioPlayer } from "expo-audio";
import { useCallback, useEffect } from "react";
import { useMediaContext } from "../../context/MediaContext";

export const AudioPlayer = () => {
  const { currentReciter, currentSurah, currentVerse } = useAppContext();
  const { audioSource, state } = useMediaContext();
  console.log("audioSource", audioSource);
  const player = useAudioPlayer(audioSource);

  const getVerseFromPosition = useCallback(
    async (position: number) => {
      const audioDetail = await getAudioDetailFromCache(
        currentReciter,
        currentSurah
      );

      if (!audioDetail) return 1;

      const currentVerse = audioDetail.timestamps.find(
        (t) => position >= t.timestamp_from && position < t.timestamp_to
      );

      return currentVerse?.verse_key.split(":")[1];
    },
    [currentReciter, currentSurah]
  );

  const getPositionFromVerse = useCallback(
    async (verse: number) => {
      const audioDetail = await getAudioDetailFromCache(
        currentReciter,
        currentSurah
      );

      if (!audioDetail) return 0;

      const currentVerse = audioDetail.timestamps.find(
        (t) => t.verse_key === `${currentSurah}:${verse}`
      );

      if (!currentVerse) return 0;

      return currentVerse.timestamp_from / 1000;
    },
    [currentReciter, currentSurah]
  );

  const handleStateChange = async () => {
    if (state === "playing") {
      if (currentVerse !== 1) {
        const position = await getPositionFromVerse(currentVerse);
        player.seekTo(position);
      }

      player.play();
    } else if (state === "paused") {
      player.pause();
    }
  };

  useEffect(() => {
    handleStateChange();
  }, [state]);

  return null;
};
