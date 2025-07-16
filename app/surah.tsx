import { AudioControl } from "@/components/AudioControl";
import { BottomSpacing } from "@/components/common/BottomSpacing";
import { Screen } from "@/components/common/Screen";
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
