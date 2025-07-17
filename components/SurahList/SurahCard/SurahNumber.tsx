import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  number: number;
};

export const SurahNumber: React.FC<Props> = ({ number }) => {
  const { isDarkMode } = useAppContext();

  const themeStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? "#10b981" : "#10b981",
    }),
    [isDarkMode]
  );

  return (
    <View style={[styles.root, themeStyle]}>
      <Text style={styles.text}>{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 40,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
