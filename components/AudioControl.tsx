import { getAudioDetail } from "@/utils/audio.data";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";
import { ReciterSelection } from "./ReciterSelection";

export const AudioControl = () => {
  const { currentVerse, currentSurah, currentReciter, isDarkMode } =
    useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const handlePlayPause = () => {
    if (!isPlaying) {
      playAudio();
    } else {
      pauseAudio();
    }
  };

  const pauseAudio = async () => {
    await soundRef.current?.pauseAsync();
    setIsPlaying(false);
  };

  const playAudio = async () => {
    if (!soundRef.current) {
      const audioDetail = await getAudioDetail(currentReciter, currentSurah);
      const fileUri = await downloadAudio(
        audioDetail.audio_url,
        audioDetail.id
      );
      const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) {
          return;
        }

        if (status.didJustFinish) {
          setIsPlaying(false);
          soundRef.current?.unloadAsync();
          soundRef.current = null;
        }
      });
    }

    await soundRef.current?.playAsync();
    setIsPlaying(true);
  };

  const downloadAudio = async (audioUrl: string, id: string) => {
    const fileName = id + "_" + audioUrl.split("/").pop();
    const localUri = `${FileSystem.documentDirectory}audio/${fileName}`;

    const fileInfo = await FileSystem.getInfoAsync(localUri);
    if (!fileInfo.exists) {
      setDownloading(true);
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}audio`,
        { intermediates: true }
      );
      const downloadResumable = FileSystem.createDownloadResumable(
        audioUrl,
        localUri
      );
      await downloadResumable.downloadAsync();
      setDownloading(false);
    }

    return localUri;
  };

  const styles = StyleSheet.create({
    audioControls: {
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      margin: 16,
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
  });

  return (
    <View style={styles.audioControls}>
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
                ? "Downloading..."
                : isPlaying
                ? "Playing"
                : "Paused"}
            </Text>
          </View>
        </View>
      </View>

      {/* Reciter Selection */}
      <ReciterSelection />
    </View>
  );
};
