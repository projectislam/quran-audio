import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { useAppContext } from "../../context/AppContext";

export const Title = () => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({ color: isDarkMode ? "#ffffff" : "#1e293b" }),
    [isDarkMode]
  );

  return <Text style={[styles.root, themeStyle]}>القرآن الكريم</Text>;
};

const styles = StyleSheet.create({
  root: {
    fontSize: 24,
    fontWeight: "bold",

    textAlign: "center",
    flex: 1,
  },
});
