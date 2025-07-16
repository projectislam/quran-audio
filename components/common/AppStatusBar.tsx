import { StatusBar } from "react-native";
import { useAppContext } from "../context/AppContext";

export const AppStatusBar = () => {
  const { isDarkMode } = useAppContext();
  return (
    <StatusBar
      barStyle={isDarkMode ? "light-content" : "dark-content"}
      backgroundColor={isDarkMode ? "#1e293b" : "#ffffff"}
    />
  );
};
