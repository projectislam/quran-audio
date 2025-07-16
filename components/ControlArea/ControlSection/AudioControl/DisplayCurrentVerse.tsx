import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

export const DisplayCurrentVerse = () => {
  const { currentVerse, isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      color: isDarkMode ? "white" : "black",
    }),
    [isDarkMode]
  );

  return <Text style={[styles.root, themeStyle]}>Verse {currentVerse}</Text>;
};

const styles = StyleSheet.create({
  root: {
    fontSize: 14,
    fontWeight: "500",
  },
});
