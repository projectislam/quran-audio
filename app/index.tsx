import { Header } from "@/components/Header";
import { ResumeSection } from "@/components/ResumeSection";
import { Screen } from "@/components/Screen";
import { SurahListSection } from "@/components/SurahListSection";
import React from "react";
import { ScrollView } from "react-native";

const QuranHomeScreen = () => {
  return (
    <Screen>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ResumeSection />
        <SurahListSection />
      </ScrollView>
    </Screen>
  );
};

export default QuranHomeScreen;
