import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  translation: string;
};

export const EnglishName: React.FC<Props> = ({ name, translation }) => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      name: {
        color: isDarkMode ? "#e2e8f0" : "#374151",
      },
      translation: {
        color: isDarkMode ? "#94a3b8" : "#64748b",
      },
    }),
    [isDarkMode]
  );

  return (
    <View style={styles.root}>
      <Text style={[styles.name, themeStyle.name]}>{name}</Text>
      <Text style={[styles.translation, themeStyle.translation]}>
        {translation}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    marginBottom: 4,
    fontSize: 16,
  },
  translation: {
    fontSize: 14,
  },
});
