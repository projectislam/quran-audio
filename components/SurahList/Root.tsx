import { useAppContext } from "@/context/AppContext";
import { PropsWithChildren, useMemo } from "react";
import { StyleSheet, Text } from "react-native";

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      color: isDarkMode ? "#ffffff" : "#1e293b",
    }),
    [isDarkMode]
  );

  return (
    <>
      <Text style={[styles.root, themeStyle]}>All Surahs</Text>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
});
