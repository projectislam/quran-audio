import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import React, { useEffect } from "react";

interface AppContextType {
  isDarkMode: boolean;
  currentSurah: number;
  currentVerse: number;
  currentReciter: number;
  soundRef: { current: Audio.Sound | null };
  isPlaying: boolean;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
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
  fontSize: 24,
  setFontSize: () => {},
  setIsPlaying: () => {},
  setCurrentSurah: () => {},
  setCurrentVerse: () => {},
  setCurrentReciter: () => {},
  toggleTheme: () => {},
});

const STORAGE_KEYS = {
  verse: "currentVerse",
  surah: "currentSurah",
  reciter: "currentReciter",
  fontSize: "fontSize",
  theme: "theme",
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, _setIsDarkMode] = React.useState(false);
  const [currentSurah, _setCurrentSurah] = React.useState(1);
  const [currentVerse, _setCurrentVerse] = React.useState(1);
  const [currentReciter, _setCurrentReciter] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [fontSize, _setFontSize] = React.useState(24);
  const soundRef = React.useRef<Audio.Sound | null>(null);

  const toggleTheme = async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.theme, (!isDarkMode).toString());
    _setIsDarkMode((prev) => !prev);
  };

  const setCurrentVerse = async (v: number) => {
    _setCurrentVerse(v);
    await AsyncStorage.setItem(STORAGE_KEYS.verse, v.toString());
  };

  const setCurrentSurah = async (s: number) => {
    _setCurrentSurah(s);
    await AsyncStorage.setItem(STORAGE_KEYS.surah, s.toString());
  };

  const setCurrentReciter = async (r: number) => {
    _setCurrentReciter(r);
    await AsyncStorage.setItem(STORAGE_KEYS.reciter, r.toString());
  };

  const setFontSize = async (f: number) => {
    _setFontSize(f);
    await AsyncStorage.setItem(STORAGE_KEYS.fontSize, f.toString());
  };

  useEffect(() => {
    const loadPersisted = async () => {
      try {
        const [v, s, r, f, t] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.verse),
          AsyncStorage.getItem(STORAGE_KEYS.surah),
          AsyncStorage.getItem(STORAGE_KEYS.reciter),
          AsyncStorage.getItem(STORAGE_KEYS.fontSize),
          AsyncStorage.getItem(STORAGE_KEYS.theme),
        ]);

        if (v) _setCurrentVerse(parseInt(v));
        if (s) _setCurrentSurah(parseInt(s));
        if (r) _setCurrentReciter(parseInt(r));
        if (f) _setFontSize(parseInt(f));
        if (t) _setIsDarkMode(t === "true");
      } catch (e) {
        console.error("Failed to load persisted settings", e);
      }
    };

    loadPersisted();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        currentSurah,
        currentVerse,
        currentReciter,
        soundRef,
        isPlaying,
        fontSize,
        setFontSize,
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
