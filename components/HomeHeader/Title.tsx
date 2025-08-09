import React from "react";
import { StyleSheet, Text } from "react-native";
import { useAppContext } from "../../context/AppContext";

export const Title = () => {
  const { theme } = useAppContext();

  return (
    <Text style={[styles.root, { color: theme.primaryText }]}>
      القرآن الكريم
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 24,
    marginRight: -48,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});
