import { useAppContext } from "@/context/AppContext";
import { useCallback, useEffect } from "react";
import { useMediaContext } from "../../../../../context/MediaContext";

export const AudioPlayer = () => {
  const { currentVerse, setCurrentVerse } = useAppContext();
  const { audioDetail, status } = useMediaContext();

  const getVerseFromPosition = useCallback(
    async (position: number) => {
      if (!audioDetail) return 1;

      const currentVerse = audioDetail.timestamps.find(
        (t) => position >= t.timestamp_from && position < t.timestamp_to
      );

      return currentVerse?.verse_key.split(":")[1];
    },
    [audioDetail]
  );

  const updateCurrentVerse = useCallback(async () => {
    if (!status?.isLoaded || !status?.playing || !audioDetail) return;

    const currentPositionMs = status.currentTime * 1000;
    const verseFromPosition = await getVerseFromPosition(currentPositionMs);

    if (!verseFromPosition) return;

    const verseNumber =
      typeof verseFromPosition === "string"
        ? parseInt(verseFromPosition)
        : verseFromPosition;

    if (verseNumber && verseNumber !== currentVerse) {
      setCurrentVerse(verseNumber);
    }
  }, [
    status,
    audioDetail,
    getVerseFromPosition,
    setCurrentVerse,
    currentVerse,
  ]);

  useEffect(() => {
    if (status?.playing && status?.currentTime) {
      updateCurrentVerse();
    }
  }, [status?.currentTime, status?.playing, updateCurrentVerse]);

  return null;
};
