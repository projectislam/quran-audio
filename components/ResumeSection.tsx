import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";

export const ResumeSection = () => {
  const { isDarkMode } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurah, setCurrentSurah] = useState("Al-Fatiha");

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const selectSurah = (surahName: any) => {
    setCurrentSurah(surahName);
  };

  const styles = StyleSheet.create({
    resumeSection: {
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      margin: 16,
      borderRadius: 16,
      padding: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    resumeTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDarkMode ? "#ffffff" : "#1e293b",
      marginBottom: 8,
    },
    resumeSubtitle: {
      fontSize: 14,
      color: isDarkMode ? "#94a3b8" : "#64748b",
      marginBottom: 16,
    },
    resumeButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#10b981",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      elevation: 2,
      shadowColor: "#10b981",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    resumeButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
  });

  return (
    <View style={styles.resumeSection}>
      <Text style={styles.resumeTitle}>Continue Listening</Text>
      <Text style={styles.resumeSubtitle}>Last played: {currentSurah}</Text>
      <TouchableOpacity style={styles.resumeButton} onPress={togglePlayPause}>
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={20}
          color="#ffffff"
        />

        <Text style={styles.resumeButtonText}>
          {isPlaying ? "Pause" : "Resume"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
