import { AudioControl } from "@/components/AudioControl";
import { BottomSpacing } from "@/components/BottomSpacing";
import { Screen } from "@/components/Screen";
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
