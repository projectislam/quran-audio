import { getSurahByNumber } from "@/utils/quran.data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";

export const ResumeSection = () => {
  const { isDarkMode, currentSurah, currentVerse } = useAppContext();

  const currentSurahData = getSurahByNumber(currentSurah);

  const resumePlay = async () => {
    router.push({ pathname: "/surah", params: { autoPlay: "true" } });
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
    surahName: {
      fontSize: 16,
      fontWeight: "600",
      color: isDarkMode ? "#ffffff" : "#1e293b",
      marginBottom: 4,
    },
    ayaInfo: {
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

      <Text style={styles.surahName}>
        {currentSurahData?.name || `Surah ${currentSurah}`}
      </Text>
      <Text style={styles.ayaInfo}>
        Aya {currentVerse}
        {currentSurahData?.ayas.length
          ? ` of ${currentSurahData.ayas.length}`
          : ""}
      </Text>

      <TouchableOpacity style={styles.resumeButton} onPress={resumePlay}>
        <Ionicons name="play" size={20} color="#ffffff" />

        <Text style={styles.resumeButtonText}>Resume</Text>
      </TouchableOpacity>
    </View>
  );
};
