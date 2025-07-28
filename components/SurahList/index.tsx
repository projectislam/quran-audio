import { useAppContext } from "@/context/AppContext";
import { getAllSurahs } from "@/utils/surah.data";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Root } from "./Root";
import { SurahCard } from "./SurahCard";

export const SurahList = () => {
  const { currentSurah, setCurrentSurah, setCurrentVerse } = useAppContext();
  const surahs = useMemo(getAllSurahs, []);

  const handleSurahSelection = async (surahNumber: number) => {
    if (surahNumber !== currentSurah) {
      setCurrentSurah(surahNumber);
      setCurrentVerse(1);
    }

    router.push(`/surah`);
  };

  return (
    <Root>
      {surahs.map((surah) => (
        <SurahCard
          key={surah.number}
          surah={surah}
          onPress={() => handleSurahSelection(surah.number)}
        />
      ))}
    </Root>
  );
};
