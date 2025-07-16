import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

export const ContinueListeningText = () => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      color: isDarkMode ? "#ffffff" : "#1e293b",
    }),
    [isDarkMode]
  );

  return <Text style={[styles.root, themeStyle]}>Continue Listening</Text>;
};

const styles = StyleSheet.create({
  root: {
    fontSize: 18,
    fontWeight: "600",

    marginBottom: 8,
  },
});
