import {
  AudioDetail,
  fetchChapterRecitation,
  getAudioDetailFromCache,
  saveAudioDetailToCache,
} from "@/utils/audio.data";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../../context/AppContext";
import { ChangeFontSize } from "../ChangeFontSize";
import { ReciterSelection } from "../ReciterSelection";
import { ControlSection } from "./ControlSection";
import { Root } from "./Root";

/**
 * AudioControl component provides the audio playback controls for Quranic
 * recitations. It handles play, pause, and downloading functionality, and
 * adjusts the UI based on the current state. The component leverages
 * context to manage audio playback state, including the current verse,
 * surah, and reciter. It also supports automatic playback on load if
 * specified via URL parameters.
 */
export const AudioControl = () => {
  const {
    currentVerse,
    currentSurah,
    currentReciter,
    isDarkMode,
    isPlaying,
    setIsPlaying,
    setCurrentVerse,
    soundRef,
  } = useAppContext();
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const pathParams = useLocalSearchParams();

  useEffect(() => {
    if (pathParams?.autoPlay === "true") {
      setIsPlaying(true);
      playAudio();
    }
  }, [pathParams]);

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
      soundRef.current = null;
    };
  }, []);

  const handlePlayPause = () => {
    if (downloading) return;

    if (!isPlaying) {
      setIsPlaying(true);
      playAudio();
    } else {
      setIsPlaying(false);
      pauseAudio();
    }
  };

  const pauseAudio = async () => {
    await soundRef.current?.pauseAsync();
  };

  const playAudio = async () => {
    const status = await soundRef.current?.getStatusAsync();
    if (status?.isLoaded && status.isPlaying) {
      return;
    }

    const audioDetail = await fetchAudioDetail(currentReciter, currentSurah);

    const currentVerseKey = `${currentSurah}:${currentVerse}`;
    const verseTimestamp = audioDetail.timestamps.find(
      (v) => v.verse_key === currentVerseKey
    );

    if (!verseTimestamp) {
      return;
    }

    if (!soundRef.current) {
      const fileUri = await downloadAudio(
        audioDetail.audio_url,
        audioDetail.id
      );
      const { sound } = await Audio.Sound.createAsync({ uri: fileUri! });
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) {
          return;
        }

        const position = status.positionMillis;

        const currentVerse = audioDetail.timestamps.find(
          (t) => position >= t.timestamp_from && position < t.timestamp_to
        );

        if (
          currentVerse &&
          currentVerse.verse_key !== currentVerseKey &&
          position > 0
        ) {
          setCurrentVerse(Number(currentVerse.verse_key.split(":")[1]));
        }

        if (status.didJustFinish) {
          setCurrentVerse(1);
          setIsPlaying(false);
          soundRef.current?.unloadAsync();
          soundRef.current = null;
        }
      });
    }

    await soundRef.current?.setPositionAsync(verseTimestamp.timestamp_from);
    await soundRef.current?.playAsync();
  };

  const fetchAudioDetail = async (reciterId: number, surahId: number) => {
    let audioDetail = await getAudioDetailFromCache(reciterId, surahId);

    if (!audioDetail) {
      setDownloading(true);
      audioDetail = await fetchChapterRecitation(reciterId, surahId);
      await saveAudioDetailToCache(reciterId, surahId, audioDetail);
      setDownloading(false);
    }

    return audioDetail as AudioDetail;
  };

  <Root>
    <ControlSection />
  </Root>;

  return (
    <View style={[styles.audioControls]}>
      <View style={styles.audioControlsTop}>
        <View style={styles.playSection}>
          <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
            <Ionicons
              name={downloading ? "arrow-down" : isPlaying ? "pause" : "play"}
              size={24}
              color="white"
              style={!isPlaying && { marginLeft: 2 }}
            />
          </TouchableOpacity>
          <View style={styles.playInfo}>
            <Text style={styles.verseText}>Verse {currentVerse}</Text>
            <Text style={styles.playingText}>
              {downloading
                ? `Downloading... ${Math.round(downloadProgress * 100)}%`
                : isPlaying
                ? "Playing"
                : "Paused"}
            </Text>
          </View>
        </View>
        <ChangeFontSize />
      </View>
      <ReciterSelection />
    </View>
  );
};

const styles = StyleSheet.create({
  audioControls: {
    backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
    padding: 20,
  },
  audioControlsTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  playSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  playButton: {
    backgroundColor: "#10b981",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  playInfo: {
    gap: 2,
  },
  verseText: {
    fontSize: 14,
    fontWeight: "500",
    color: isDarkMode ? "white" : "black",
  },
  playingText: {
    fontSize: 12,
    color: isDarkMode ? "white" : "black",
  },
  fontButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
  },
});
