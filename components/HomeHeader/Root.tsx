import React, { PropsWithChildren, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useAppContext } from "../../context/AppContext";

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
    }),
    [isDarkMode]
  );

  return <View style={[styles.root, themeStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
