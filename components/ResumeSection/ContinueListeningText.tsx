import { useAppContext } from "@/context/AppContext";
import { StyleSheet, Text } from "react-native";

export const ContinueListeningText = () => {
  const { theme } = useAppContext();

  return (
    <Text style={[styles.root, { color: theme.primaryText }]}>
      Continue Listening
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 18,
    fontWeight: "600",

    marginBottom: 8,
  },
});
