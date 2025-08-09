import { useAppContext } from "@/context/AppContext";
import { StyleSheet, Text } from "react-native";

export const DisplayCurrentVerse = () => {
  const { currentVerse, theme } = useAppContext();

  return (
    <Text style={[styles.root, { color: theme.primaryText }]}>
      Verse {currentVerse}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 14,
    fontWeight: "500",
  },
});
