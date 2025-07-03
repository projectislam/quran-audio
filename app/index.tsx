import { AppStatusBar } from "@/components/AppStatusBar";
import { Header } from "@/components/Header";
import { ResumeSection } from "@/components/ResumeSection";
import { SurahListSection } from "@/components/SurahListSection";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

const QuranHomeScreen = () => {
  const { isDarkMode } = useAppContext();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
    },
  });

  return (
    <>
      <AppStatusBar />
      <SafeAreaView style={styles.container}>
        <Header />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Resume Section */}
          <ResumeSection />

          {/* Surahs List */}
          <SurahListSection />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default QuranHomeScreen;
