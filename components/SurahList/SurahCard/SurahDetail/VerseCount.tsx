import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  arabic: string;
  verseCount: number;
};

export const VerseCount: React.FC<Props> = ({ arabic, verseCount }) => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      arabic: {
        color: isDarkMode ? "#ffffff" : "#1e293b",
      },
      verseCount: {
        color: isDarkMode ? "#64748b" : "#94a3b8",
      },
    }),
    [isDarkMode]
  );

  return (
    <View style={styles.root}>
      <Text style={[styles.arabic, themeStyle.arabic]}>{arabic}</Text>
      <Text style={[styles.verseCount, themeStyle.verseCount]}>
        {verseCount} verses
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "flex-end",
    marginLeft: 16,
  },
  arabic: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 18,
  },
  verseCount: {
    fontSize: 12,
  },
});
