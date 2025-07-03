import React from "react";

interface AppContextType {
  isDarkMode: boolean;
  currentSurah: number;
  currentVerse: number;
  currentReciter: number;
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
