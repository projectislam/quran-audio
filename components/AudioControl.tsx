import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";
import { ReciterSelection } from "./ReciterSelection";

export const AudioControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentVerse, isDarkMode } = useAppContext();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
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
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="white"
              style={!isPlaying && { marginLeft: 2 }}
            />
          </TouchableOpacity>
          <View style={styles.playInfo}>
            <Text style={styles.verseText}>Verse {currentVerse}</Text>
            <Text style={styles.playingText}>Playing</Text>
          </View>
        </View>
      </View>

      {/* Reciter Selection */}
      <ReciterSelection />
    </View>
  );
};
