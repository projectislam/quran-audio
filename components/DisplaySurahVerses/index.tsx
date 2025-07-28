import { useAppContext } from "@/context/AppContext";
import React from "react";
import { RenderHtml } from "./RenderHtml";
import { Root } from "./Root";

export const DisplaySurahVerses = () => {
  const { setCurrentVerse } = useAppContext();

  const handleVerseSelection = (verse: number) => {
    setCurrentVerse(verse);
  };

  return (
    <Root>
      <RenderHtml onVerseSelection={handleVerseSelection} />
    </Root>
  );
};
