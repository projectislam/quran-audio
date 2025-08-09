import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import { StatusBar } from "react-native";

export const AppStatusBar = () => {
  const { theme } = useAppContext();

  const barStyle = useMemo(() => {
    if (theme.key === "dark") {
      return "light-content";
    }

    return "dark-content";
  }, [theme]);

  return <StatusBar barStyle={barStyle} backgroundColor={theme.surface} />;
};
