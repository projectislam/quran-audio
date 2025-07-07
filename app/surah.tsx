import { AppStatusBar } from "@/components/AppStatusBar";
import { AudioControl } from "@/components/AudioControl";
import { SurahHeader } from "@/components/SurahHeader";
import { SurahVerses } from "@/components/SurahVerses";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

const SurahDetailScreen = () => {
  const { isDarkMode } = useAppContext();

  const styles = StyleSheet.create({
    versesContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    bottomSpacing: {
      height: 80,
    },
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
    },
  });

  return (
    <>
      <AppStatusBar />
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 32 }} />
        {/* Header */}
        <SurahHeader />

        <AudioControl />

        {/* Verses */}
        <ScrollView
          style={styles.versesContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Verses Container */}
          <SurahVerses />

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SurahDetailScreen;
