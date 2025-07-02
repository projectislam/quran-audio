import React from "react";

interface AppContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const AppContext = React.createContext<AppContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
