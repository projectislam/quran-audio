import { getAllSurahs } from "@/utils/surah.data";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";

export const SurahListSection = () => {
  const {
    isDarkMode,
    setCurrentSurah,
    setCurrentVerse,
    soundRef,
    currentSurah,
  } = useAppContext();

  const surahs = useMemo(getAllSurahs, []);

  const handleSurahSelection = async (surahNumber: number) => {
    if (currentSurah !== surahNumber) {
      setCurrentSurah(surahNumber);
      setCurrentVerse(1);
    }
    await soundRef.current?.unloadAsync();
    soundRef.current = null;
    router.push("/surah");
  };

  const styles = StyleSheet.create({
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
    <>
      <Text style={styles.sectionTitle}>All Surahs</Text>

      {surahs.map((surah) => (
        <TouchableOpacity
          key={surah.number}
          style={styles.surahItem}
          onPress={() => handleSurahSelection(surah.number)}
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
    </>
  );
};
