import { useAppContext } from "@/context/AppContext";
import { PropsWithChildren, useMemo } from "react";
import { StyleSheet, View } from "react-native";

export const Root: React.FC<PropsWithChildren> = () => {
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
    flexDirection: "row",
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
