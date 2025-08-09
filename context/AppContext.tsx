import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect } from "react";

interface AppTheme {
  key: string;
  label: string;
  background: string;
  surface: string;
  primaryText: string;
  secondaryText: string;
  buttonBG: string;
  buttonText: string;
  secondaryButtonBG: string;
  secondaryButtonText: string;
  selectedText: string;
}

export const themes: Record<string, AppTheme> = {
  light: {
    key: "light",
    label: "Light (Default)",
    background: "#f8fafc",
    surface: "#ffffff",
    primaryText: "#0f172a",
    secondaryText: "#475569",
    buttonBG: "#10b981",
    buttonText: "#ffffff",
    secondaryButtonBG: "#e2e8f0",
    secondaryButtonText: "#64748b",
    selectedText: "#059669",
  },
  dark: {
    key: "dark",
    label: "Dark",
    background: "#0f172a",
    surface: "#1e293b",
    primaryText: "#f8fafc",
    secondaryText: "#cbd5e1",
    buttonBG: "#10b981",
    buttonText: "#ffffff",
    secondaryButtonBG: "#334155",
    secondaryButtonText: "#fbbf24",
    selectedText: "#6ee7b7",
  },
  colorBlind: {
    key: "colorBlind",
    label: "Color Blind",
    background: "#ffffff",
    surface: "#f1f5f9",
    primaryText: "#1e293b",
    secondaryText: "#475569",
    buttonBG: "#2563eb",
    buttonText: "#ffffff",
    secondaryButtonBG: "#bae6fd",
    secondaryButtonText: "#075985",
    selectedText: "#0891b2",
  },
  senior: {
    key: "senior",
    label: "Senior Friendly",
    background: "#fffaf0",
    surface: "#ffffff",
    primaryText: "#111827",
    secondaryText: "#374151",
    buttonBG: "#d97706",
    buttonText: "#ffffff",
    secondaryButtonBG: "#fde68a",
    secondaryButtonText: "#78350f",
    selectedText: "#b45309",
  },
};

interface AppContextType {
  theme: AppTheme;
  currentSurah: number;
  currentVerse: number;
  currentReciter: number;
  soundRef: { current: Audio.Sound | null };
  isPlaying: boolean;
  fontSize: number;
  orientation: ScreenOrientation.OrientationLock;
  setOrientation: (orientation: ScreenOrientation.OrientationLock) => void;
  setFontSize: (fontSize: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentSurah: (surah: number) => void;
  setCurrentVerse: (verse: number) => void;
  setCurrentReciter: (reciter: number) => void;
  setTheme: (theme: string) => void;
}

const AppContext = React.createContext<AppContextType>({
  theme: themes.light,
  currentSurah: 1,
  currentVerse: 1,
  currentReciter: 1,
  soundRef: { current: null },
  isPlaying: false,
  fontSize: 24,
  orientation: ScreenOrientation.OrientationLock.PORTRAIT_UP,
  setOrientation: () => {},
  setFontSize: () => {},
  setIsPlaying: () => {},
  setCurrentSurah: () => {},
  setCurrentVerse: () => {},
  setCurrentReciter: () => {},
  setTheme: () => {},
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
  const [theme, _setTheme] = React.useState(themes.light);
  const [currentSurah, _setCurrentSurah] = React.useState(1);
  const [currentVerse, _setCurrentVerse] = React.useState(1);
  const [currentReciter, _setCurrentReciter] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [fontSize, _setFontSize] = React.useState(24);
  const soundRef = React.useRef<Audio.Sound | null>(null);
  const [orientation, setOrientation] = React.useState(
    ScreenOrientation.OrientationLock.PORTRAIT_UP
  );

  const setTheme = async (newTheme: string) => {
    if (!themes[newTheme]) return;

    await AsyncStorage.setItem(STORAGE_KEYS.theme, newTheme.toString());
    _setTheme(themes[newTheme]);
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
        if (t) themes[t] && _setTheme(themes[t]);
      } catch (e) {
        console.error("Failed to load persisted settings", e);
      }
    };

    loadPersisted();
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        currentSurah,
        currentVerse,
        currentReciter,
        soundRef,
        isPlaying,
        fontSize,
        orientation,
        setTheme,
        setOrientation,
        setFontSize,
        setIsPlaying,
        setCurrentSurah,
        setCurrentVerse,
        setCurrentReciter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
