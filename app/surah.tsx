import { BottomSpacing } from "@/components/common/BottomSpacing";
import { Screen } from "@/components/common/Screen";
import { ControlArea } from "@/components/ControlArea";
import { DisplaySurahVerses } from "@/components/DisplaySurahVerses/SurahVerses";
import { SurahHeader } from "@/components/SurahHeader/SurahHeader";
import React from "react";

const SurahDetailScreen = () => {
  return (
    <Screen>
      <SurahHeader />
      <ControlArea />
      <DisplaySurahVerses />
      <BottomSpacing />
    </Screen>
  );
};

export default SurahDetailScreen;
