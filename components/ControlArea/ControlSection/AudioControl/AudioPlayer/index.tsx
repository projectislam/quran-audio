import { useAppContext } from "@/context/AppContext";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useCallback, useEffect, useRef } from "react";
import { useMediaContext } from "../../context/MediaContext";

export const AudioPlayer = () => {
  const { currentSurah, currentVerse, setCurrentVerse } = useAppContext();
  const { audioSource, audioDetail, state } = useMediaContext();
  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

  const autoVerseRef = useRef(1);

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

  const getPositionFromVerse = useCallback(
    async (verse: number) => {
      if (!audioDetail) return 0;

      const currentVerse = audioDetail.timestamps.find(
        (t) => t.verse_key === `${currentSurah}:${verse}`
      );

      if (!currentVerse) return 0;

      return currentVerse.timestamp_from / 1000;
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
      autoVerseRef.current = verseNumber;
      setCurrentVerse(verseNumber);
    }
  }, [
    status,
    audioDetail,
    getVerseFromPosition,
    setCurrentVerse,
    currentVerse,
  ]);

  const handleVerseChange = useCallback(async () => {
    if (!player) return;

    if (autoVerseRef.current === currentVerse) return;

    const position = await getPositionFromVerse(currentVerse);
    player.seekTo(position);
  }, [player, currentVerse, getPositionFromVerse]);

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
  }, [state, audioDetail]);

  useEffect(() => {
    if (status?.playing && status?.currentTime) {
      updateCurrentVerse();
    }
  }, [status?.currentTime, status?.playing, updateCurrentVerse]);

  useEffect(() => {
    handleVerseChange();
  }, [currentVerse, handleVerseChange]);

  useEffect(() => {
    autoVerseRef.current = 1;
  }, [audioSource]);

  return null;
};
