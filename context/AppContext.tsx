import { Audio } from "expo-av";
import React from "react";

interface AppContextType {
  isDarkMode: boolean;
  currentSurah: number;
  currentVerse: number;
  currentReciter: number;
  soundRef: { current: Audio.Sound | null };
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentSurah: (surah: number) => void;
  setCurrentVerse: (verse: number) => void;
  setCurrentReciter: (reciter: number) => void;
  toggleTheme: () => void;
}

const AppContext = React.createContext<AppContextType>({
  isDarkMode: false,
  currentSurah: 1,
  currentVerse: 1,
  currentReciter: 1,
  soundRef: { current: null },
  isPlaying: false,
  setIsPlaying: () => {},
  setCurrentSurah: () => {},
  setCurrentVerse: () => {},
  setCurrentReciter: () => {},
  toggleTheme: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [currentSurah, setCurrentSurah] = React.useState(1);
  const [currentVerse, setCurrentVerse] = React.useState(1);
  const [currentReciter, setCurrentReciter] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const soundRef = React.useRef<Audio.Sound | null>(null);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        currentSurah,
        currentVerse,
        currentReciter,
        soundRef,
        isPlaying,
        setIsPlaying,
        setCurrentSurah,
        setCurrentVerse,
        setCurrentReciter,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
