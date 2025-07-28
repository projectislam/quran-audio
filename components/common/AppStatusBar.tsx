import { useAppContext } from "@/context/AppContext";
import { StatusBar } from "react-native";

export const AppStatusBar = () => {
  const { isDarkMode } = useAppContext();
  return (
    <StatusBar
      barStyle={isDarkMode ? "light-content" : "dark-content"}
      backgroundColor={isDarkMode ? "#1e293b" : "#ffffff"}
    />
  );
};
