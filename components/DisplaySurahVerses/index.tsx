import { useAppContext } from "@/context/AppContext";
import { useMediaContext } from "@/context/MediaContext";
import React from "react";
import { RenderHtml } from "./RenderHtml";
import { Root } from "./Root";

export const DisplaySurahVerses = () => {
  const { currentSurah, setCurrentVerse } = useAppContext();
  const { goToVerse, status } = useMediaContext();

  const handleVerseSelection = (verse: number) => {
    const verseKey = `${currentSurah}:${verse}`;
    goToVerse(verseKey);
    if (!status?.playing) {
      setCurrentVerse(verse);
    }
  };

  return (
    <Root>
      <RenderHtml onVerseSelection={handleVerseSelection} />
    </Root>
  );
};
