import { getAllSurahs } from "@/utils/surah.data";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const QuranHomeScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSurah, setCurrentSurah] = useState("Al-Fatiha");

  const surahs = useMemo(getAllSurahs, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const selectSurah = (surahName: any) => {
    setCurrentSurah(surahName);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? "#ffffff" : "#1e293b",
      textAlign: "center",
      flex: 1,
    },
    themeButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
    },
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
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkMode ? "#ffffff" : "#1e293b",
      marginHorizontal: 20,
      marginTop: 8,
      marginBottom: 16,
    },
    surahItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      marginHorizontal: 16,
      marginVertical: 4,
      padding: 16,
      borderRadius: 12,
      elevation: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    surahNumber: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? "#10b981" : "#10b981",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    surahNumberText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "bold",
    },
    surahContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    surahLeft: {
      flex: 1,
    },
    surahEnglish: {
      fontWeight: "600",
      marginBottom: 4,
      fontSize: 16,
      color: isDarkMode ? "#e2e8f0" : "#374151",
    },
    surahTranslation: {
      fontSize: 14,
      color: isDarkMode ? "#94a3b8" : "#64748b",
    },
    surahRight: {
      alignItems: "flex-end",
      marginLeft: 16,
    },
    surahArabic: {
      fontWeight: "bold",
      marginBottom: 4,
      fontSize: 18,
      color: isDarkMode ? "#ffffff" : "#1e293b",
    },
    surahVerses: {
      fontSize: 12,
      color: isDarkMode ? "#64748b" : "#94a3b8",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#1e293b" : "#ffffff"}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Ionicons
            name="settings-outline"
            size={20}
            color={isDarkMode ? "#94a3b8" : "#64748b"}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>القرآن الكريم</Text>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Ionicons
            name={isDarkMode ? "sunny-outline" : "moon-outline"}
            size={20}
            color={isDarkMode ? "#fbbf24" : "#64748b"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Resume Section */}
        <View style={styles.resumeSection}>
          <Text style={styles.resumeTitle}>Continue Listening</Text>
          <Text style={styles.resumeSubtitle}>Last played: {currentSurah}</Text>
          <TouchableOpacity
            style={styles.resumeButton}
            onPress={togglePlayPause}
          >
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

        {/* Surahs List */}
        <Text style={styles.sectionTitle}>All Surahs</Text>

        {surahs.map((surah) => (
          <TouchableOpacity
            key={surah.number}
            style={styles.surahItem}
            onPress={() => selectSurah(surah.english)}
          >
            <View style={styles.surahNumber}>
              <Text style={styles.surahNumberText}>{surah.number}</Text>
            </View>

            <View style={styles.surahContent}>
              <View style={styles.surahLeft}>
                <Text style={styles.surahEnglish}>{surah.english}</Text>
                <Text style={styles.surahTranslation}>{surah.translation}</Text>
              </View>

              <View style={styles.surahRight}>
                <Text style={styles.surahArabic}>{surah.arabic}</Text>
                <Text style={styles.surahVerses}>{surah.verses} verses</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuranHomeScreen;
