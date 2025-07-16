import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export const Root = () => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
    }),
    [isDarkMode]
  );

  return <View style={[styles.root, themeStyle]}></View>;
};

const styles = StyleSheet.create({
  root: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 16,
    padding: 20,
  },
});
