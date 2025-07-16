import { getAllSurahs } from "@/utils/surah.data";
import React, { useMemo } from "react";
import { Root } from "./Root";
import { SurahCard } from "./SurahCard";

export const SurahListSection = () => {
  const surahs = useMemo(getAllSurahs, []);

  const handleSurahSelection = async (surahNumber: number) => {};

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
