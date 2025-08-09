import { useAppContext } from "@/context/AppContext";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useMemo } from "react";
import { StatusBar } from "react-native";

export const AppStatusBar = () => {
  const { theme } = useAppContext();

  const barStyle = useMemo(() => {
    if (theme.key === "dark") {
      return "light-content";
    }

    return "dark-content";
  }, [theme]);

  useEffect(() => {
    let buttonStyle: any = "dark";

    if (theme.key === "dark") {
      buttonStyle = "light";
    }

    NavigationBar.setBackgroundColorAsync(theme.surface);
    NavigationBar.setButtonStyleAsync(buttonStyle);
  }, [theme.surface]);

  return <StatusBar barStyle={barStyle} backgroundColor={theme.surface} />;
};
