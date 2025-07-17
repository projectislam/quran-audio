import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAppContext } from "../../context/AppContext";

export const ToggleTheme = () => {
  const { isDarkMode, toggleTheme } = useAppContext();

  const themeStyle = useMemo(
    () => ({ backgroundColor: isDarkMode ? "#334155" : "#e2e8f0" }),
    [isDarkMode]
  );

  return (
    <TouchableOpacity style={[styles.root, themeStyle]} onPress={toggleTheme}>
      <Ionicons
        name={isDarkMode ? "sunny-outline" : "moon-outline"}
        size={20}
        color={isDarkMode ? "#fbbf24" : "#64748b"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 8,
    borderRadius: 20,
  },
});
