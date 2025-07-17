import { Screen } from "@/components/common/Screen";
import { Header } from "@/components/HomeHeader";
import { ResumeSection } from "@/components/ResumeSection";
import { SurahList } from "@/components/SurahList";
import React from "react";
import { ScrollView } from "react-native";

const QuranHomeScreen = () => {
  return (
    <Screen>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ResumeSection />
        <SurahList />
      </ScrollView>
    </Screen>
  );
};

export default QuranHomeScreen;
