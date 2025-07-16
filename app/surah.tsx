import { BottomSpacing } from "@/components/common/BottomSpacing";
import { Screen } from "@/components/common/Screen";
import { AudioControl } from "@/components/ControlArea";
import { SurahHeader } from "@/components/SurahHeader";
import { SurahVerses } from "@/components/SurahVerses";
import React from "react";

const SurahDetailScreen = () => {
  return (
    <Screen>
      <SurahHeader />
      <AudioControl />
      <SurahVerses />
      <BottomSpacing />
    </Screen>
  );
};

export default SurahDetailScreen;
